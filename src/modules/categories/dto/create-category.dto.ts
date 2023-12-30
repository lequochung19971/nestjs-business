import { IsNotEmpty, IsOptional } from 'class-validator';
import { StringField } from 'src/decorators/fields/string-field.decorator';

export class CreateCategoryDto {
  @StringField()
  @IsNotEmpty()
  title: string;

  @StringField()
  @IsOptional()
  description?: string;

  @StringField()
  parentId?: string;
}
