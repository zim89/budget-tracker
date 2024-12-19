import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TYPE_VALUES } from 'src/constants/common.consts';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(TYPE_VALUES)
  type: string;
}
