import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private repo: Repository<Supplier>,
  ) {}

  findAll() {
    return this.repo.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const supplier = await this.repo.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Fornecedor não encontrado');
    return supplier;
  }

  async create(data: { name: string; cnpj: string; contact?: string | null }) {
    const exists = await this.repo.findOne({ where: { cnpj: data.cnpj } });
    if (exists) throw new ConflictException('CNPJ já cadastrado');

    return this.repo.save({
      name: data.name,
      cnpj: data.cnpj,
      contact: data.contact ?? null,
    });
  }

  async update(
    id: number,
    data: { name?: string; cnpj?: string; contact?: string | null },
  ) {
    const supplier = await this.findOne(id);

    if (data.cnpj && data.cnpj !== supplier.cnpj) {
      const exists = await this.repo.findOne({ where: { cnpj: data.cnpj } });
      if (exists) throw new ConflictException('CNPJ já cadastrado');
    }

    await this.repo.update(id, {
      name: data.name ?? supplier.name,
      cnpj: data.cnpj ?? supplier.cnpj,
      contact: data.contact !== undefined ? data.contact : supplier.contact,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const supplier = await this.findOne(id);
    await this.repo.remove(supplier);
    return { message: 'Fornecedor removido com sucesso' };
  }
}
