import { QueryResponseMetaDto } from 'src/dtos/query-response-meta.dto';
import { QueryResponseDto } from 'src/dtos/query-response.dto';
import { BaseEntity } from 'src/entities/base.entity';
import { Constructor } from 'src/types/constructor';

export function toDtoArray<DTO, E extends BaseEntity = BaseEntity>(
  dtoClass: Constructor<DTO>,
  array: E[],
) {
  return array.map((a) => a.toDto(dtoClass));
}

export function toQueryResponseDto<DTO, E extends BaseEntity = BaseEntity>(
  dtoClass: Constructor<DTO>,
  data: {
    entity: E[];
    meta: QueryResponseMetaDto;
  },
) {
  return new QueryResponseDto<DTO>({
    data: toDtoArray<DTO, E>(dtoClass, data.entity),
    meta: data.meta,
  });
}
