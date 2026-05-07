import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DofService } from './dof.service';

@UseGuards(JwtAuthGuard)
@Controller('dof')
export class DofController {
  constructor(private dofService: DofService) {}

  @Get()
  getControl() {
    return this.dofService.getControl();
  }
}
