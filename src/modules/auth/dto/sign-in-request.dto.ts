import { IsEmail } from 'class-validator';

export class SignInRequestDto {
  @IsEmail({
    allow_display_name: false,
  })
  email: string;

  password: string;
}
