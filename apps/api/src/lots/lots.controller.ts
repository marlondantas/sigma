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
import { LotsService } from './lots.service';

@UseGuards(JwtAuthGuard)
@Controller('lots')
export class LotsController {
  constructor(private lotsService: LotsService) {}

  @Get()
  findAll() {
    return this.lotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lotsService.findOne(id);
  }

  @Post()
  create(
    @Req() req: any,
    @Body()
    body: {
      dofNumber: string;
      supplierId: number;
      entryDate: string;
      items: Array<{
        productId: number;
        quantity: number;
      }>;
    },
  ) {
    return this.lotsService.create(body, req.user?.userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      dofNumber?: string;
      supplierId?: number;
      entryDate?: string;
      items?: Array<{
        productId: number;
        quantity: number;
      }>;
    },
  ) {
    return this.lotsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lotsService.remove(id);
  }
}
