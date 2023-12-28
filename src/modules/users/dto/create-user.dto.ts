import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsPassword } from 'src/decorators/is-password.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Name must have at least 2 characters.',
  })
  name: string;

  @IsNotEmpty()
  @MinLength(2, {
    message: 'Name must have at least 2 characters.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail(
    {
      allow_display_name: false,
    },
    { message: 'Please provide valid Email.' },
  )
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPassword()
  password: string;
}
