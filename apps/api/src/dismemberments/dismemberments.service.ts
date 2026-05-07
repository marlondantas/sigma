import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { StockService } from '../stock/stock.service';
import { User } from '../users/user.entity';
import { DismembermentItem } from './dismemberment-item.entity';
import { Dismemberment } from './dismemberment.entity';

type DismembermentItemInput = {
  destinationProductId: number;
  quantity: number;
};

@Injectable()
export class DismembermentsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Dismemberment)
    private repo: Repository<Dismemberment>,
    @InjectRepository(DismembermentItem)
    private itemsRepo: Repository<DismembermentItem>,
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private stockService: StockService,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['items', 'items.destinationProduct'],
      order: {
        date: 'DESC',
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const dismemberment = await this.repo.findOne({
      where: { id },
      relations: ['items', 'items.destinationProduct'],
    });

    if (!dismemberment) {
      throw new NotFoundException('Desmembramento não encontrado');
    }

    return dismemberment;
  }

  async create(
    data: {
      originProductId: number;
      originQuantity: number;
      items: DismembermentItemInput[];
      date?: string;
    },
    userId?: number,
  ) {
    if (!Number.isInteger(data.originQuantity) || data.originQuantity <= 0) {
      throw new BadRequestException('Quantidade de origem inválida');
    }

    if (!data.items?.length) {
      throw new BadRequestException(
        'O desmembramento precisa ter ao menos um item de destino',
      );
    }

    const originProduct = await this.productsRepo.findOne({
      where: { id: data.originProductId },
    });
    if (!originProduct) throw new NotFoundException('Produto de origem não encontrado');

    const availableQuantity = await this.stockService.getAvailableQuantity(
      originProduct.id,
    );
    const availableVolume = await this.stockService.getAvailableVolume(
      originProduct.id,
    );
    const originVolume =
      Number(originProduct.unit_volume_m3) * data.originQuantity;

    if (availableQuantity < data.originQuantity || availableVolume < originVolume) {
      throw new BadRequestException(
        'Estoque insuficiente para realizar o desmembramento',
      );
    }

    const destinationItems: Array<{
      destinationProductId: number;
      quantity: number;
      volume_m3: number;
    }> = [];
    let destinationVolume = 0;

    for (const item of data.items) {
      if (
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0 ||
        !item.destinationProductId
      ) {
        throw new BadRequestException('Item de destino inválido');
      }

      const destinationProduct = await this.productsRepo.findOne({
        where: { id: item.destinationProductId },
      });
      if (!destinationProduct) {
        throw new NotFoundException('Produto de destino não encontrado');
      }

      const volume = Number(destinationProduct.unit_volume_m3) * item.quantity;
      destinationVolume += volume;
      destinationItems.push({
        destinationProductId: destinationProduct.id,
        quantity: item.quantity,
        volume_m3: volume,
      });
    }

    if (Math.abs(destinationVolume - originVolume) > 0.001) {
      throw new BadRequestException(
        'O volume dos itens de destino deve ser igual ao volume de origem',
      );
    }

    let user: User | null = null;
    if (userId) {
      user = await this.usersRepo.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException('Usuário não encontrado');
    }

    return this.dataSource.transaction(async (manager) => {
      const dismemberment = await manager.save(Dismemberment, {
        originProductId: originProduct.id,
        originQuantity: data.originQuantity,
        originVolume_m3: originVolume,
        date: data.date ? new Date(data.date) : new Date(),
        userId: user?.id ?? null,
      });

      await manager.save(
        DismembermentItem,
        destinationItems.map((item) => ({
          dismembermentId: dismemberment.id,
          ...item,
        })),
      );

      return this.findOne(dismemberment.id);
    });
  }

  async remove(id: number) {
    const dismemberment = await this.findOne(id);
    await this.repo.remove(dismemberment);
    return { message: 'Desmembramento removido com sucesso' };
  }
}
