import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { StringField } from 'src/decorators/fields/string-field.decorator';
import { IsPassword } from 'src/decorators/is-password.decorator';

export class CreateUserDto {
  @StringField({
    minLength: 2,
  })
  @IsNotEmpty()
  name: string;

  @StringField({
    minLength: 2,
  })
  @IsNotEmpty()
  username: string;

  @StringField()
  @IsNotEmpty()
  @IsEmail(
    {
      allow_display_name: false,
    },
    { message: 'Please provide valid Email.' },
  )
  email: string;

  @StringField()
  @IsNotEmpty()
  @IsPassword()
  password: string;
}
