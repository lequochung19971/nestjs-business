import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { IDecodedRefreshTokenPayload } from '../interfaces/decoded-refresh-token-payload.interface';

function extractJWTRefreshTokenFromCookie(req: Request): string | null {
  if (!!req.signedCookies?.refreshToken?.length) {
    return req.signedCookies.refreshToken.replace('Bearer', '').trim();
  }
  return null;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJWTRefreshTokenFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: IDecodedRefreshTokenPayload) {
    const refreshToken = req.signedCookies.refreshToken
      .replace('Bearer', '')
      .trim();
    const user = this.authService.getMatchedRefreshTokenUser(
      payload,
      refreshToken,
    );

    return {
      ...user,
      refreshTokenPayload: payload,
    };
  }
}
