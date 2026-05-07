import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { DismembermentItem } from '../dismemberments/dismemberment-item.entity';
import { Dismemberment } from '../dismemberments/dismemberment.entity';
import { LotItem } from '../lots/lot-item.entity';
import { Movement } from '../movements/movement.entity';

type StockRow = {
  productId: number;
  product: Product;
  quantity: number;
  volume_m3: number;
};

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    @InjectRepository(LotItem)
    private lotItemsRepo: Repository<LotItem>,
    @InjectRepository(Movement)
    private movementsRepo: Repository<Movement>,
    @InjectRepository(Dismemberment)
    private dismembermentsRepo: Repository<Dismemberment>,
    @InjectRepository(DismembermentItem)
    private dismembermentItemsRepo: Repository<DismembermentItem>,
  ) {}

  async getCurrentStock() {
    const map = await this.buildStockMap();

    const products = Array.from(map.values())
      .map((row) => ({
        productId: row.productId,
        product: row.product,
        quantity: row.quantity,
        volume_m3: this.round(row.volume_m3),
      }))
      .filter((row) => row.quantity !== 0 || row.volume_m3 !== 0)
      .sort((a, b) => {
        const byName = (a.product.common_name || a.product.scientific_name || '')
          .localeCompare(b.product.common_name || b.product.scientific_name || '');

        if (byName !== 0) return byName;
        return a.product.wood_type.localeCompare(b.product.wood_type);
      });

    const species = new Map<
      string,
      {
        common_name: string | null;
        scientific_name: string | null;
        quantity: number;
        volume_m3: number;
      }
    >();

    for (const row of products) {
      const key = this.speciesKey(row.product);
      const existing = species.get(key) || {
        common_name: row.product.common_name,
        scientific_name: row.product.scientific_name,
        quantity: 0,
        volume_m3: 0,
      };

      existing.quantity += row.quantity;
      existing.volume_m3 += row.volume_m3;
      species.set(key, existing);
    }

    const speciesSummary = Array.from(species.values()).map((row) => ({
      ...row,
      volume_m3: this.round(row.volume_m3),
    }));

    const totalQuantity = products.reduce((sum, row) => sum + row.quantity, 0);
    const totalVolume = products.reduce((sum, row) => sum + row.volume_m3, 0);

    return {
      totalQuantity,
      totalVolume_m3: this.round(totalVolume),
      productCount: products.length,
      speciesCount: speciesSummary.length,
      products,
      species: speciesSummary,
    };
  }

  async getProductStock(productId: number) {
    const map = await this.buildStockMap();
    const row = map.get(productId);

    if (!row) {
      const product = await this.productsRepo.findOne({ where: { id: productId } });
      if (!product) return null;
      return {
        productId: product.id,
        product,
        quantity: 0,
        volume_m3: 0,
      };
    }

    return {
      productId: row.productId,
      product: row.product,
      quantity: row.quantity,
      volume_m3: this.round(row.volume_m3),
    };
  }

  async getAvailableVolume(productId: number) {
    const row = await this.getProductStock(productId);
    return row?.volume_m3 ?? 0;
  }

  async getAvailableQuantity(productId: number) {
    const row = await this.getProductStock(productId);
    return row?.quantity ?? 0;
  }

  private async buildStockMap() {
    const products = await this.productsRepo.find();
    const map = new Map<number, StockRow>();

    for (const product of products) {
      map.set(product.id, {
        productId: product.id,
        product,
        quantity: 0,
        volume_m3: 0,
      });
    }

    const lotItems = await this.lotItemsRepo.find({ relations: ['product'] });
    for (const item of lotItems) {
      const row = map.get(item.productId);
      if (!row) continue;
      row.quantity += item.quantity;
      row.volume_m3 += Number(item.volume_m3);
    }

    const movements = await this.movementsRepo.find({ relations: ['product'] });
    for (const movement of movements) {
      const row = map.get(movement.productId);
      if (!row) continue;

      if (movement.type === 'saida') {
        row.quantity -= movement.quantity;
        row.volume_m3 -= Number(movement.volume_m3);
      } else {
        row.quantity += movement.quantity;
        row.volume_m3 += Number(movement.volume_m3);
      }
    }

    const dismemberments = await this.dismembermentsRepo.find({
      relations: ['originProduct'],
    });
    for (const dismemberment of dismemberments) {
      const row = map.get(dismemberment.originProductId);
      if (!row) continue;

      row.quantity -= dismemberment.originQuantity;
      row.volume_m3 -= Number(dismemberment.originVolume_m3);
    }

    const dismembermentItems = await this.dismembermentItemsRepo.find({
      relations: ['destinationProduct'],
    });
    for (const item of dismembermentItems) {
      const row = map.get(item.destinationProductId);
      if (!row) continue;

      row.quantity += item.quantity;
      row.volume_m3 += Number(item.volume_m3);
    }

    return map;
  }

  private speciesKey(product: Product) {
    return `${product.common_name ?? ''}::${product.scientific_name ?? ''}`;
  }

  private round(value: number) {
    return Number(value.toFixed(6));
  }
}
