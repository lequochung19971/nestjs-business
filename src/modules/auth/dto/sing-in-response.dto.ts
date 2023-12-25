import { UserDto } from 'src/modules/users/dto/user.dto';
import { Type } from 'class-transformer';
import { TokenDto } from './token.dto';

export class SignInResponseDto {
  user: UserDto;

  @Type(() => TokenDto)
  accessToken: TokenDto;

  @Type(() => TokenDto)
  refreshToken: TokenDto;

  constructor(props: SignInResponseDto) {
    this.user = props.user;
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}
