import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestBody, SignUpRequestBody } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() request: SignUpRequestBody) {
    return this.authService.signUp(request);
  }

  @Post('sign-in')
  signIn(@Body() request: SignInRequestBody) {
    return this.authService.signIn(request);
  }

  @Get('logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }
}
