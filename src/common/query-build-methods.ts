import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

// Declaration Merging Of Module.
declare module 'typeorm/query-builder/SelectQueryBuilder' {
  // eslint-disable-next-line no-shadow
  interface SelectQueryBuilder<Entity> {
    search(columns: string[], value: string): SelectQueryBuilder<Entity>;
  }
}

SelectQueryBuilder.prototype.search = function <Entity>(
  this: SelectQueryBuilder<Entity>,
  columns: string[],
  value: string,
) {
  const searchColumnsString = columns.reduce((result, cols, index, arr) => {
    if (index === arr.length - 1) {
      result += cols;
    } else {
      result = `${result + cols}||' '||`;
    }

    return result;
  }, '');

  return this.where(
    `to_tsvector(${searchColumnsString}) @@ to_tsquery(:searchValue)`,
    {
      searchValue: `${value}:*`,
    },
  );
};
