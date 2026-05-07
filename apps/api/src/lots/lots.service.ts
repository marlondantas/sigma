import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { Supplier } from '../suppliers/supplier.entity';
import { User } from '../users/user.entity';
import { LotItem } from './lot-item.entity';
import { Lot } from './lot.entity';

type LotItemInput = {
  productId: number;
  quantity: number;
};

@Injectable()
export class LotsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Lot)
    private repo: Repository<Lot>,
    @InjectRepository(LotItem)
    private lotItemRepo: Repository<LotItem>,
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    @InjectRepository(Supplier)
    private suppliersRepo: Repository<Supplier>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['items', 'items.product'],
      order: {
        entryDate: 'DESC',
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const lot = await this.repo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });

    if (!lot) throw new NotFoundException('Lote não encontrado');
    return lot;
  }

  async create(
    data: {
      dofNumber: string;
      supplierId: number;
      entryDate: string;
      items: LotItemInput[];
    },
    userId?: number,
  ) {
    await this.ensureLotPayload(data);

    const existingLot = await this.repo.findOne({
      where: { dofNumber: data.dofNumber },
    });
    if (existingLot) throw new ConflictException('Número do DOF já cadastrado');

    return this.dataSource.transaction(async (manager) => {
      const supplier = await manager.findOne(Supplier, {
        where: { id: data.supplierId },
      });
      if (!supplier) throw new NotFoundException('Fornecedor não encontrado');

      let createdBy: User | null = null;
      if (userId) {
        createdBy = await manager.findOne(User, { where: { id: userId } });
        if (!createdBy) throw new NotFoundException('Usuário não encontrado');
      }

      const lot = await manager.save(Lot, {
        dofNumber: data.dofNumber,
        supplierId: supplier.id,
        entryDate: data.entryDate,
        createdById: createdBy?.id ?? null,
      });

      const items = await this.buildLotItems(manager, lot.id, data.items);
      await manager.save(LotItem, items);

      return this.findOne(lot.id);
    });
  }

  async update(
    id: number,
    data: {
      dofNumber?: string;
      supplierId?: number;
      entryDate?: string;
      items?: LotItemInput[];
    },
  ) {
    const lot = await this.findOne(id);

    if (data.items && data.items.length === 0) {
      throw new BadRequestException('O lote precisa ter ao menos um item');
    }

    if (data.dofNumber && data.dofNumber !== lot.dofNumber) {
      const existingLot = await this.repo.findOne({
        where: { dofNumber: data.dofNumber },
      });
      if (existingLot) throw new ConflictException('Número do DOF já cadastrado');
    }

    return this.dataSource.transaction(async (manager) => {
      if (data.supplierId) {
        const supplier = await manager.findOne(Supplier, {
          where: { id: data.supplierId },
        });
        if (!supplier) throw new NotFoundException('Fornecedor não encontrado');
      }

      await manager.update(Lot, id, {
        dofNumber: data.dofNumber ?? lot.dofNumber,
        supplierId: data.supplierId ?? lot.supplierId,
        entryDate: data.entryDate ?? lot.entryDate,
      });

      if (data.items) {
        await this.ensureLotItems(data.items);
        await manager.delete(LotItem, { lotId: id });
        const items = await this.buildLotItems(manager, id, data.items);
        await manager.save(LotItem, items);
      }

      return this.findOne(id);
    });
  }

  async remove(id: number) {
    const lot = await this.findOne(id);
    await this.repo.remove(lot);
    return { message: 'Lote removido com sucesso' };
  }

  private async ensureLotPayload(data: {
    dofNumber: string;
    supplierId: number;
    entryDate: string;
    items: LotItemInput[];
  }) {
    if (!data.dofNumber?.trim()) {
      throw new BadRequestException('Número do DOF é obrigatório');
    }

    if (!data.entryDate) {
      throw new BadRequestException('Data de entrada é obrigatória');
    }

    await this.ensureLotItems(data.items);
  }

  private async ensureLotItems(items: LotItemInput[]) {
    if (!items?.length) {
      throw new BadRequestException('O lote precisa ter ao menos um item');
    }

    for (const item of items) {
      if (!item.productId) {
        throw new BadRequestException('Produto é obrigatório em todos os itens');
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new BadRequestException('Quantidade inválida em item do lote');
      }
    }
  }

  private async buildLotItems(
    manager: DataSource['manager'],
    lotId: number,
    items: LotItemInput[],
  ) {
    const builtItems: Array<{
      lotId: number;
      productId: number;
      quantity: number;
      volume_m3: number;
    }> = [];

    for (const item of items) {
      const product = await manager.findOne(Product, {
        where: { id: item.productId },
      });
      if (!product) throw new NotFoundException('Produto não encontrado');

      builtItems.push({
        lotId,
        productId: product.id,
        quantity: item.quantity,
        volume_m3: Number(product.unit_volume_m3) * item.quantity,
      });
    }

    return builtItems;
  }
}
