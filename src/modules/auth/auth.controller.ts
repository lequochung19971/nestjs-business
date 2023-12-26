import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInRequestDto) {
    return this.authService.signIn(body);
  }

  @Post('sign-out')
  @UseGuards(JwtGuard)
  async signOut(@Req() req: Request) {
    return this.usersService.updateUser(req.user['id'], {
      refreshToken: null,
    });
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req: Request) {
    return this.authService.generateAccessTokenInfo({
      userId: req.user['id'],
    });
  }
}