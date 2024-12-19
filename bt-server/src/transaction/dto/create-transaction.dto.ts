import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import type { Transaction } from '../entities/transaction.entity';
import { TYPE_VALUES } from 'src/constants/common.consts';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  @IsIn(TYPE_VALUES)
  type: string;

  @IsNotEmpty()
  category_id: Transaction;

  @IsNotEmpty()
  @IsString()
  description: string;
}
