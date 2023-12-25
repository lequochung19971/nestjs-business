import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenDto } from './dto/token.dto';
import { UsersRepository } from '../users/users.repository';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignInResponseDto } from './dto/sing-in-response.dto';
import { UserDto } from '../users/dto/user.dto';
import { SALT_ROUND } from 'src/constants/salt-round.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(data: SignInRequestDto) {
    const { email, password } = data;

    const user = await this.getAuthenticatedUser(email, password);

    const accessToken = await this.generateAccessTokenInfo({
      userId: user.id,
    });

    const refreshToken = await this.generateRefreshTokenInfo({
      userId: user.id,
    });

    await this.storeRefreshTokenInfo(user, refreshToken.token);

    return new SignInResponseDto({
      user: user.toDto(UserDto),
      accessToken,
      refreshToken,
    });
  }

  async getAuthenticatedUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({
        email,
      });
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        throw new BadRequestException();
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials!!');
    }
  }

  async getMatchedRefreshTokenUser(userId: string, refreshToken: string) {
    const user = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatched = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatched) {
      throw new BadRequestException('Unmatched');
    }

    return user;
  }

  async generateAccessTokenInfo(payload: { userId }) {
    const expiresIn = +this.configService.get<string>(
      'ACCESS_TOKEN_EXPIRATION_TIME',
    );
    return new TokenDto({
      expiresIn,
      token: await this.jwtService.signAsync(payload, {
        secret: 'access_token_secret',
        expiresIn,
      }),
    });
  }

  async generateRefreshTokenInfo(payload: { userId }) {
    const expiresIn = +this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRATION_TIME',
    );
    return new TokenDto({
      expiresIn,
      token: await this.jwtService.signAsync(payload, {
        secret: 'refresh_token_secret',
        expiresIn,
      }),
    });
  }

  private async storeRefreshTokenInfo(
    user: User,
    token: string,
  ): Promise<void> {
    const hashedToken = await bcrypt.hash(token, SALT_ROUND);
    await this.usersRepository.save({
      ...user,
      refreshToken: hashedToken,
    });
  }
}
