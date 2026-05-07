import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { StockService } from '../stock/stock.service';
import { LotItem } from '../lots/lot-item.entity';

@Injectable()
export class DofService {
  constructor(
    private stockService: StockService,
    @InjectRepository(LotItem)
    private lotItemsRepo: Repository<LotItem>,
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  async getControl() {
    const stock = await this.stockService.getCurrentStock();
    const lotItems = await this.lotItemsRepo.find({ relations: ['product', 'lot'] });

    const dofBySpecies = new Map<
      string,
      {
        common_name: string | null;
        scientific_name: string | null;
        totalDof_m3: number;
        dofNumbers: Set<string>;
      }
    >();

    for (const item of lotItems) {
      const key = this.speciesKey(item.product);
      const row = dofBySpecies.get(key) || {
        common_name: item.product.common_name,
        scientific_name: item.product.scientific_name,
        totalDof_m3: 0,
        dofNumbers: new Set<string>(),
      };

      row.totalDof_m3 += Number(item.volume_m3);
      row.dofNumbers.add(item.lot.dofNumber);
      dofBySpecies.set(key, row);
    }

    const stockBySpecies = new Map(
      stock.species.map((row) => [
        `${row.common_name ?? ''}::${row.scientific_name ?? ''}`,
        row,
      ]),
    );

    const speciesRows = Array.from(
      new Set([...Array.from(dofBySpecies.keys()), ...Array.from(stockBySpecies.keys())]),
    ).map((key) => {
      const dof = dofBySpecies.get(key);
      const physical = stockBySpecies.get(key);
      const totalDof = Number((dof?.totalDof_m3 ?? 0).toFixed(6));
      const totalCubagem = Number((physical?.volume_m3 ?? 0).toFixed(6));
      const difference = Number((totalCubagem - totalDof).toFixed(6));
      const divergencePct =
        totalDof === 0
          ? totalCubagem === 0
            ? 0
            : 100
          : Number((((difference / totalDof) * 100)).toFixed(2));

      return {
        common_name: physical?.common_name ?? dof?.common_name ?? null,
        scientific_name: physical?.scientific_name ?? dof?.scientific_name ?? null,
        totalCubagem_m3: totalCubagem,
        totalDof_m3: totalDof,
        difference_m3: difference,
        divergence_pct: divergencePct,
        status: this.getStatus(Math.abs(divergencePct)),
        activeDofs: dof?.dofNumbers.size ?? 0,
      };
    });

    const summary = {
      speciesCount: speciesRows.length,
      conformingCount: speciesRows.filter((row) => row.status === 'conforme').length,
      warningCount: speciesRows.filter((row) => row.status === 'atencao').length,
      irregularCount: speciesRows.filter((row) => row.status === 'irregular').length,
      totalCubagem_m3: Number(
        speciesRows.reduce((sum, row) => sum + row.totalCubagem_m3, 0).toFixed(6),
      ),
      totalDof_m3: Number(
        speciesRows.reduce((sum, row) => sum + row.totalDof_m3, 0).toFixed(6),
      ),
      activeDofs: new Set(
        lotItems.map((item) => item.lot?.dofNumber).filter(Boolean),
      ).size,
    };

    return {
      summary,
      species: speciesRows.sort((a, b) =>
        (a.common_name || a.scientific_name || '').localeCompare(
          b.common_name || b.scientific_name || '',
        ),
      ),
    };
  }

  private speciesKey(product: Product) {
    return `${product.common_name ?? ''}::${product.scientific_name ?? ''}`;
  }

  private getStatus(divergencePct: number) {
    if (divergencePct <= 10) return 'conforme';
    if (divergencePct <= 15) return 'atencao';
    return 'irregular';
  }
}
