import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'access_token_secret',
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
