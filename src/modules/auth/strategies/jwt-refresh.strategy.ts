import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'refresh_token_secret',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: { userId: string }) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return this.authService.getMatchedRefreshTokenUser(
      payload.userId,
      refreshToken,
    );
  }
}
