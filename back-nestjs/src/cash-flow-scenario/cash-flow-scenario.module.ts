import { Module } from '@nestjs/common';
import { CashFlowScenarioService } from './cash-flow-scenario.service';
import { CashFlowScenarioController } from './cash-flow-scenario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CashFlowScenario } from './entities/cash-flow-scenario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, CashFlowScenario])],
  controllers: [CashFlowScenarioController],
  providers: [CashFlowScenarioService],
})
export class CashFlowScenarioModule {}
