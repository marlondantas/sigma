import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StockService } from './stock.service';

@UseGuards(JwtAuthGuard)
@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @Get()
  getCurrentStock() {
    return this.stockService.getCurrentStock();
  }

  @Get('products')
  async getProducts() {
    const stock = await this.stockService.getCurrentStock();
    return stock.products;
  }

  @Get('species')
  async getSpecies() {
    const stock = await this.stockService.getCurrentStock();
    return stock.species;
  }

  @Get('products/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.getProductStock(id);
  }
}
