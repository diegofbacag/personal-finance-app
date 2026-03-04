import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CashFlowDirection } from '../entities/cash-flow-scenario.entity';

export class UpsertCashFlowScenarioDto {
  @IsInt()
  @Min(0)
  amount: number;

  @IsEnum(CashFlowDirection)
  direction: CashFlowDirection;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  subcategory?: string;
}
