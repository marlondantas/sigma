import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DofModule } from '../dof/dof.module';
import { Dismemberment } from '../dismemberments/dismemberment.entity';
import { Lot } from '../lots/lot.entity';
import { Movement } from '../movements/movement.entity';
import { Product } from '../products/product.entity';
import { StockModule } from '../stock/stock.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lot, Movement, Dismemberment, Product]),
    StockModule,
    DofModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
