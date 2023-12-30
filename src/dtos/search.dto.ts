import { IsArray, IsNotEmpty } from 'class-validator';

export class SearchDto {
  @IsArray()
  @IsNotEmpty()
  columns: string[];

  @IsNotEmpty()
  value: string;
}
