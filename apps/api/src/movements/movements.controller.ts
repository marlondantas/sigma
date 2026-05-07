import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MovementsService } from './movements.service';

@UseGuards(JwtAuthGuard)
@Controller('movements')
export class MovementsController {
  constructor(private movementsService: MovementsService) {}

  @Get()
  findAll() {
    return this.movementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movementsService.findOne(id);
  }

  @Post()
  create(
    @Req() req: any,
    @Body()
    body: {
      type: 'saida' | 'ajuste';
      productId: number;
      quantity: number;
      volume_m3?: number;
      date?: string;
      observation?: string | null;
    },
  ) {
    return this.movementsService.create(body, req.user?.userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      type?: 'saida' | 'ajuste';
      productId?: number;
      quantity?: number;
      volume_m3?: number;
      date?: string;
      observation?: string | null;
    },
  ) {
    return this.movementsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movementsService.remove(id);
  }
}
