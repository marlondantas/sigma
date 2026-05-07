import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { DismembermentItem } from '../dismemberments/dismemberment-item.entity';
import { Dismemberment } from '../dismemberments/dismemberment.entity';
import { LotItem } from '../lots/lot-item.entity';
import { Movement } from '../movements/movement.entity';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      LotItem,
      Movement,
      Dismemberment,
      DismembermentItem,
    ]),
  ],
  providers: [StockService],
  controllers: [StockController],
  exports: [StockService],
})
export class StockModule {}
