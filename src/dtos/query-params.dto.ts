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
  readonly order?: Order;

  @IsOptional()
  readonly orderColumn?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  readonly page: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  readonly take: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  includeTotalCount?: boolean;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
