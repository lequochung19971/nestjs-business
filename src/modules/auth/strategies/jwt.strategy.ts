import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/modules/users/users.repository';

function extractJWTFromCookie(req: Request): string | null {
  if (!!req.cookies?.accessToken?.length) {
    return req.cookies.accessToken.replace('Bearer', '').trim();
  }
  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(args: { userId: string }) {
    const user = await this.userRepository.findOneBy({
      id: args.userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
