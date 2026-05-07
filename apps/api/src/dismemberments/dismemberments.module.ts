import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { StockModule } from '../stock/stock.module';
import { User } from '../users/user.entity';
import { DismembermentItem } from './dismemberment-item.entity';
import { Dismemberment } from './dismemberment.entity';
import { DismembermentsController } from './dismemberments.controller';
import { DismembermentsService } from './dismemberments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dismemberment, DismembermentItem, Product, User]),
    StockModule,
  ],
  providers: [DismembermentsService],
  controllers: [DismembermentsController],
  exports: [DismembermentsService],
})
export class DismembermentsModule {}
