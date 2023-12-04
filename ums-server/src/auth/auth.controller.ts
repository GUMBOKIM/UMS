import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { SignInRequestDto, SignUpRequestDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() request: SignUpRequestDto) {
    return this.authService.signUp(request);
  }

  @Post('sign-in')
  async signIn(@Body() request: SignInRequestDto, @Session() session: any) {
    const member = await this.authService.validateMember(request);
    return 'login success';
  }

  @Get('session')
  async getAuthSession(@Session() session: Record<string, any>) {
    return session.member;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  async getHello(@Session() session: Record<string, any>) {
    return session;
  }

  @Get('logout')
  async logout(@Session() session) {
    session.destroy();
    return 'success logout';
  }
}
