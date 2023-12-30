import { IsEmail } from 'class-validator';
import { StringField } from 'src/decorators/fields/string-field.decorator';

export class SignInRequestDto {
  @StringField()
  @IsEmail({
    allow_display_name: false,
  })
  email: string;

  @StringField()
  password: string;
}
