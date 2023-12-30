import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Order } from 'src/enums/order.enum';
import { NumberField } from 'src/decorators/fields/number-field.decorator';
import { SearchDto } from './search.dto';

export class QueryParamsDto {
  @IsOptional()
  @IsEnum(Order)
  readonly order?: Order;

  @IsOptional()
  readonly orderColumn?: string;

  @NumberField()
  @Min(0)
  readonly page: number;

  @NumberField({
    min: 1,
    max: 50,
  })
  readonly take: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  includeTotalCount?: boolean;

  @Type(() => SearchDto)
  @IsOptional()
  search?: SearchDto;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
