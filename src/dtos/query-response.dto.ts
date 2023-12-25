import { ValidateNested } from 'class-validator';
import { QueryResponseMetaDto } from './query-response-meta.dto';
import { Type } from 'class-transformer';
export class QueryResponseDto<T> {
  readonly data: T[];

  @ValidateNested()
  @Type(() => QueryResponseMetaDto)
  readonly meta: QueryResponseMetaDto;

  constructor(props: QueryResponseDto<T>) {
    this.data = props.data;
    this.meta = props.meta;
  }
}
