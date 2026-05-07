import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { StockModule } from '../stock/stock.module';
import { User } from '../users/user.entity';
import { Movement } from './movement.entity';
import { MovementsController } from './movements.controller';
import { MovementsService } from './movements.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movement, Product, User]),
    StockModule,
  ],
  providers: [MovementsService],
  controllers: [MovementsController],
  exports: [MovementsService],
})
export class MovementsModule {}
