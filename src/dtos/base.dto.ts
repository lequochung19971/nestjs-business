import { Expose } from 'class-transformer';
import { DateField } from 'src/decorators/fields/date-field.decorator';
import { StringField } from 'src/decorators/fields/string-field.decorator';

export abstract class BaseDto {
  @Expose()
  @StringField()
  id: string;

  @Expose()
  @DateField()
  createdAt: Date;

  @Expose()
  @DateField()
  updatedAt: Date;

  @Expose()
  @DateField()
  deletedAt: Date;
}
