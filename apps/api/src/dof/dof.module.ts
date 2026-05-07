import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { StockModule } from '../stock/stock.module';
import { LotItem } from '../lots/lot-item.entity';
import { DofController } from './dof.controller';
import { DofService } from './dof.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LotItem, Product]),
    StockModule,
  ],
  providers: [DofService],
  controllers: [DofController],
  exports: [DofService],
})
export class DofModule {}
