export class QueryResponseMetaDto {
  readonly take: number;

  readonly page: number;

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
