import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
  ) {}

  @Post('register')
  async register(@Req() req) {
    return this.authService.register(req.body);
  }

  @Post('login')
  async login(@Body('email') email: string) {
    return this.authService.login(email);
  }

  @Get('verify')
  async verify(@Query('token') token: string) {
    return this.authService.verify(token);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Req() req) {
    return req.user;
  }

  @Post('refresh')
  async refresh(@Body('refresh') refresh: string) {
    return this.authService.refresh(refresh);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req) {
    const userId = req.user.id;
    return this.authService.profile(userId);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req, @Res() res) {
    const redirectUrl = await this.authService.googleRedirect(req.user);
    return res.redirect(redirectUrl);
  }
}
