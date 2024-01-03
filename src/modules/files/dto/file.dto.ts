import { NumberField } from 'src/decorators/fields/number-field.decorator';
import { StringField } from 'src/decorators/fields/string-field.decorator';
import { BaseDto } from 'src/dtos/base.dto';
import { IsEnum } from 'class-validator';
import { MimeTypes } from '../enums/mine-types.enum';
import { FileExtension } from '../enums/file-extension.enum';

export class FileDto extends BaseDto {
  @StringField()
  name: string;

  @NumberField()
  size: number;

  @IsEnum(FileExtension)
  extension: string;

  @StringField()
  path: string;

  @IsEnum(MimeTypes)
  mimeType: MimeTypes;
}
