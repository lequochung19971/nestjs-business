import { NumberField } from 'src/decorators/fields/number-field.decorator';

export class QueryResponseMetaDto {
  @NumberField()
  readonly take: number;

  @NumberField()
  readonly page: number;

  @NumberField({
    optional: true,
  })
  readonly totalCount?: number;

  readonly hasPreviousPage?: boolean;

  readonly hasNextPage?: boolean;

  constructor(props: QueryResponseMetaDto) {
    this.take = props.take;
    this.page = props.page;
    this.totalCount = props.totalCount;
    this.hasNextPage = props.hasNextPage;
    this.hasPreviousPage = props.hasPreviousPage;
  }
}
