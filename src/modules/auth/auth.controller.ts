import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
import { JwtGuard } from '../../guards/jwt.guard';
import { JwtRefreshGuard } from '../../guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign-in')
  async signIn(
    @Body() body: SignInRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signIn(body);
    response.cookie('accessToken', `Bearer ${result.accessToken.token}`, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      expires: new Date(Date.now() + result.accessToken.expiresIn),
      signed: true,
    });
    response.cookie('refreshToken', `Bearer ${result.refreshToken.token}`, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      expires: new Date(Date.now() + result.refreshToken.expiresIn),
      signed: true,
    });
    return result;
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

  @Get('csrf')
  @UseGuards(JwtGuard)
  async getCsrfToken(@Req() req: Request) {
    return {
      csrfToken: req.getCsrfToken(),
    };
  }
}
