import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DofService } from '../dof/dof.service';
import { Dismemberment } from '../dismemberments/dismemberment.entity';
import { Lot } from '../lots/lot.entity';
import { Movement } from '../movements/movement.entity';
import { Product } from '../products/product.entity';
import { StockService } from '../stock/stock.service';

@Injectable()
export class DashboardService {
  constructor(
    private stockService: StockService,
    private dofService: DofService,
    @InjectRepository(Lot)
    private lotsRepo: Repository<Lot>,
    @InjectRepository(Movement)
    private movementsRepo: Repository<Movement>,
    @InjectRepository(Dismemberment)
    private dismembermentsRepo: Repository<Dismemberment>,
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  async getDashboard(user: any) {
    const stock = await this.stockService.getCurrentStock();
    const dof = await this.dofService.getControl();
    const [lots, movements, dismemberments, products] = await Promise.all([
      this.lotsRepo.find({
        relations: ['items', 'items.product', 'supplier'],
        order: { createdAt: 'DESC' },
        take: 5,
      }),
      this.movementsRepo.find({
        relations: ['product', 'user'],
        order: { date: 'DESC' },
        take: 5,
      }),
      this.dismembermentsRepo.find({
        relations: ['originProduct', 'items', 'items.destinationProduct', 'user'],
        order: { date: 'DESC' },
        take: 5,
      }),
      this.productsRepo.find(),
    ]);

    const latestActivity = [
      ...lots.map((lot) => ({
        type: 'entrada',
        date: lot.createdAt,
        referenceId: lot.id,
        description: `Lote DOF ${lot.dofNumber}`,
        volume_m3: Number(
          lot.items.reduce((sum, item) => sum + Number(item.volume_m3), 0).toFixed(6),
        ),
      })),
      ...movements.map((movement) => ({
        type: movement.type,
        date: movement.date,
        referenceId: movement.id,
        description: movement.product.common_name || movement.product.wood_type,
        volume_m3: Number(Number(movement.volume_m3).toFixed(6)),
      })),
      ...dismemberments.map((dismemberment) => ({
        type: 'desmembramento',
        date: dismemberment.date,
        referenceId: dismemberment.id,
        description:
          dismemberment.originProduct.common_name ||
          dismemberment.originProduct.wood_type,
        volume_m3: Number(Number(dismemberment.originVolume_m3).toFixed(6)),
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return {
      message: 'Acesso permitido',
      user,
      summary: {
        totalStockVolume_m3: stock.totalVolume_m3,
        totalStockQuantity: stock.totalQuantity,
        activeDofs: dof.summary.activeDofs,
        speciesCount: stock.speciesCount,
        productCount: products.length,
        dofAlerts:
          dof.summary.warningCount + dof.summary.irregularCount,
        entriesCount: await this.lotsRepo.count(),
        movementsCount: await this.movementsRepo.count(),
        dismembermentsCount: await this.dismembermentsRepo.count(),
      },
      dof: dof.summary,
      latestActivity,
    };
  }
}
