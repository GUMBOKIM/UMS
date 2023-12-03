import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestBody } from './type/auth.type';
import { AuthenticatedGuard } from './authenticated.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() request: SignUpRequestBody) {
    return this.authService.signUp(request);
  }

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async signIn() {
    return 'login success';
  }

  @Get('session')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    console.log(Object.keys(session.cookie));
    Object.keys(session).forEach((key) => console.log('key', session[key]));
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  async getHello(@Session() session: Record<string, any>) {
    console.log('session');
    return session;
  }

  @Get('logout')
  async logout(@Session() session) {
    session.destroy();
    return 'success logout';
  }
}
