import { BaseDto } from 'src/dtos/base.dto';
import { StringField } from 'src/decorators/fields/string-field.decorator';

export class UserDto extends BaseDto {
  @StringField()
  name: string;

  @StringField()
  username: string;

  @StringField()
  email: string;
}
