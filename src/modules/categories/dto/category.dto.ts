import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from 'src/dtos/base.dto';
import { StringField } from 'src/decorators/fields/string-field.decorator';
import { File } from 'src/modules/files/entities/file.entity';

export class CategoryDto extends BaseDto {
  @StringField()
  @IsNotEmpty()
  title: string;

  @StringField()
  @IsOptional()
  description?: string;

  @Type(() => CategoryDto)
  @IsOptional()
  parent?: CategoryDto;

  @Type(() => CategoryDto)
  @IsOptional()
  children?: CategoryDto[];

  @Type(() => File)
  @IsOptional()
  media?: File[];
}
