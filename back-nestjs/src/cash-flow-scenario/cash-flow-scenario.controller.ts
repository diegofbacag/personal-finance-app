import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CashFlowScenarioService } from './cash-flow-scenario.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpsertCashFlowScenarioDto } from './dto/upsert-cash-flow-scenario.dto';

@Controller('cash-flow-scenario')
@UseGuards(AuthGuard)
export class CashFlowScenarioController {
  constructor(
    private readonly cashFlowScenarioService: CashFlowScenarioService,
  ) {}

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const userId: string = req.user.sub;
    return this.cashFlowScenarioService.findOne(id, userId);
  }

  @Put()
  upsert(
    @Body() upsertCashFlowScenarioDto: UpsertCashFlowScenarioDto,
    @Req() req,
  ) {
    const userId: string = req.user.sub;
    return this.cashFlowScenarioService.upsert(
      upsertCashFlowScenarioDto,
      userId,
    );
  }
}
