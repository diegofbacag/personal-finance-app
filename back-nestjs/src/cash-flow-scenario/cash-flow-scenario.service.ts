import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpsertCashFlowScenarioDto } from './dto/upsert-cash-flow-scenario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CashFlowDirection,
  CashFlowScenario,
} from './entities/cash-flow-scenario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CashFlowScenarioService {
  constructor(
    @InjectRepository(CashFlowScenario)
    private cashFlowScenarioRepository: Repository<CashFlowScenario>,
  ) {}

  async findOne(userId: string) {
    const existing = await this.cashFlowScenarioRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!existing) {
      throw new NotFoundException(`User not found`);
    }

    return existing;
  }

  async upsert(
    upsertCashFlowScenarioDto: UpsertCashFlowScenarioDto,
    userId: string,
  ) {
    const existing = await this.cashFlowScenarioRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    const entity = this.cashFlowScenarioRepository.create({
      ...upsertCashFlowScenarioDto,
      user: { id: userId },
      id: existing?.id,
    });

    return this.cashFlowScenarioRepository.save(entity);
  }
}
