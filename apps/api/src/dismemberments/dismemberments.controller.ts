import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DismembermentsService } from './dismemberments.service';

@UseGuards(JwtAuthGuard)
@Controller('dismemberments')
export class DismembermentsController {
  constructor(private dismembermentsService: DismembermentsService) {}

  @Get()
  findAll() {
    return this.dismembermentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dismembermentsService.findOne(id);
  }

  @Post()
  create(
    @Req() req: any,
    @Body()
    body: {
      originProductId: number;
      originQuantity: number;
      items: Array<{
        destinationProductId: number;
        quantity: number;
      }>;
      date?: string;
    },
  ) {
    return this.dismembermentsService.create(body, req.user?.userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dismembermentsService.remove(id);
  }
}
