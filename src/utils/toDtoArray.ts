import { QueryResponseMetaDto } from 'src/dtos/query-response-meta.dto';
import { QueryResponseDto } from 'src/dtos/query-response.dto';
import { BaseEntity } from 'src/entities/base.entity';
import { Constructor } from 'src/types/constructor';

export function toDtoArray<DTO extends Constructor, E extends BaseEntity>(
  dtoClass: DTO,
  array: E[],
) {
  return array.map((a) => a.toDto(dtoClass));
}

export function toQueryResponseDto<
  DTO extends Constructor,
  E extends BaseEntity,
>(
  dtoClass: DTO,
  data: {
    entity: E[];
    meta: QueryResponseMetaDto;
  },
) {
  return new QueryResponseDto({
    data: toDtoArray(dtoClass, data.entity),
    meta: data.meta,
  });
}
