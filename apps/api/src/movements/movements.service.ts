import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { StockService } from '../stock/stock.service';
import { User } from '../users/user.entity';
import { Movement, MovementType } from './movement.entity';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement)
    private repo: Repository<Movement>,
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private stockService: StockService,
  ) {}

  findAll() {
    return this.repo.find({
      order: {
        date: 'DESC',
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const movement = await this.repo.findOne({ where: { id } });
    if (!movement) throw new NotFoundException('Movimentação não encontrada');
    return movement;
  }

  async create(
    data: {
      type: MovementType;
      productId: number;
      quantity: number;
      volume_m3?: number;
      date?: string;
      observation?: string | null;
    },
    userId?: number,
  ) {
    const payload = await this.normalizePayload(data);
    await this.ensureStockAvailability(payload.type, payload.productId, payload.quantity, payload.volume_m3);

    let user: User | null = null;
    if (userId) {
      user = await this.usersRepo.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException('Usuário não encontrado');
    }

    return this.repo.save({
      ...payload,
      userId: user?.id ?? null,
    });
  }

  async update(
    id: number,
    data: {
      type?: MovementType;
      productId?: number;
      quantity?: number;
      volume_m3?: number;
      date?: string;
      observation?: string | null;
    },
  ) {
    const movement = await this.findOne(id);
    const payload = await this.normalizePayload({
      type: data.type ?? movement.type,
      productId: data.productId ?? movement.productId,
      quantity: data.quantity ?? movement.quantity,
      volume_m3:
        data.volume_m3 !== undefined
          ? data.volume_m3
          : Number(movement.volume_m3),
      date: data.date ?? movement.date.toISOString(),
      observation:
        data.observation !== undefined ? data.observation : movement.observation,
    });

    const availableQuantity = await this.stockService.getAvailableQuantity(
      movement.productId,
    );
    const availableVolume = await this.stockService.getAvailableVolume(
      movement.productId,
    );

    const restoredQuantity =
      movement.type === 'saida'
        ? availableQuantity + movement.quantity
        : availableQuantity - movement.quantity;

    const restoredVolume =
      movement.type === 'saida'
        ? availableVolume + Number(movement.volume_m3)
        : availableVolume - Number(movement.volume_m3);

    if (payload.type === 'saida') {
      if (payload.productId === movement.productId) {
        if (restoredQuantity < payload.quantity || restoredVolume < payload.volume_m3) {
          throw new BadRequestException('Estoque insuficiente para a saída');
        }
      } else {
        const targetQuantity = await this.stockService.getAvailableQuantity(
          payload.productId,
        );
        const targetVolume = await this.stockService.getAvailableVolume(
          payload.productId,
        );
        if (targetQuantity < payload.quantity || targetVolume < payload.volume_m3) {
          throw new BadRequestException('Estoque insuficiente para a saída');
        }
      }
    }

    await this.repo.update(id, payload);
    return this.findOne(id);
  }

  async remove(id: number) {
    const movement = await this.findOne(id);
    await this.repo.remove(movement);
    return { message: 'Movimentação removida com sucesso' };
  }

  private async normalizePayload(data: {
    type: MovementType;
    productId: number;
    quantity: number;
    volume_m3?: number;
    date?: string;
    observation?: string | null;
  }) {
    if (!['saida', 'ajuste'].includes(data.type)) {
      throw new BadRequestException('Tipo de movimentação inválido');
    }

    const product = await this.productsRepo.findOne({
      where: { id: data.productId },
    });
    if (!product) throw new NotFoundException('Produto não encontrado');

    if (!Number.isFinite(data.quantity) || data.quantity === 0) {
      throw new BadRequestException('Quantidade inválida');
    }

    if (data.type === 'saida' && data.quantity < 0) {
      throw new BadRequestException('Saída não aceita quantidade negativa');
    }

    const calculatedVolume =
      data.volume_m3 !== undefined
        ? data.volume_m3
        : Number(product.unit_volume_m3) * Math.abs(data.quantity);

    if (!Number.isFinite(calculatedVolume) || calculatedVolume === 0) {
      throw new BadRequestException('Volume inválido');
    }

    if (data.type === 'saida' && calculatedVolume < 0) {
      throw new BadRequestException('Saída não aceita volume negativo');
    }

    return {
      type: data.type,
      productId: product.id,
      quantity: data.quantity,
      volume_m3: calculatedVolume,
      date: data.date ? new Date(data.date) : new Date(),
      observation: data.observation ?? null,
    };
  }

  private async ensureStockAvailability(
    type: MovementType,
    productId: number,
    quantity: number,
    volume_m3: number,
  ) {
    if (type !== 'saida') return;

    const availableQuantity = await this.stockService.getAvailableQuantity(productId);
    const availableVolume = await this.stockService.getAvailableVolume(productId);

    if (availableQuantity < quantity || availableVolume < volume_m3) {
      throw new BadRequestException('Estoque insuficiente para a saída');
    }
  }
}
