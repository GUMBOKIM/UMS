import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest, SignUpRequest } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() request: SignUpRequest) {
    return this.authService.signUp(request);
  }

  @Post('sign-in')
  signIn(@Body() request: SignInRequest) {
    return this.authService.signIn(request);
  }
}
