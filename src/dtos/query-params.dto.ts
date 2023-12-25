import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Order } from 'src/enums/order.enum';

export class QueryParamsDto {
  @IsOptional()
  @IsEnum(Order)
  readonly order?;

  @IsOptional()
  readonly orderColumn?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  readonly page;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  readonly take;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  includeTotalCount = false;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
