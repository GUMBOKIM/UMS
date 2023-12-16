import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './auth.dto';
import { Login } from './session/session.decorator';
import { LoginMember } from './session/session.type';
import { SessionGuard } from './session/session.guard';
import { CompanyType } from '../entity/base/company.entity';
import { AllowedCompany } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpRequest: SignUpRequestDto) {
    return this.authService.signUp(signUpRequest);
  }

  @Post('sign-in')
  async signIn(@Body() singInRequest: SignInRequestDto, @Req() request) {
    const member = await this.authService.validateMember(singInRequest);
    return this.authService.setLoginSession(request, member);
  }

  @UseGuards(SessionGuard)
  @Get('sign-info')
  async loginUserInfo(@Login() loginMember: LoginMember) {
    return loginMember;
  }

  @Get('logout')
  async logout(@Session() session: any) {
    session.destroy();
    return 'logout success';
  }

  // for login test
  @UseGuards(SessionGuard)
  @AllowedCompany(CompanyType.CUSTOMER)
  @Get('guard-customer')
  async guardCustomer(@Session() session: any) {
    return session.member;
  }

  @UseGuards(SessionGuard)
  @AllowedCompany(CompanyType.PROVIDER)
  @Get('guard-provider')
  async guardProvider(@Session() session: any) {
    return session.member;
  }

  @UseGuards(SessionGuard)
  @AllowedCompany(CompanyType.SUPPLIER)
  @Get('guard-supplier')
  async guardSupplier(@Session() session: any) {
    return session.member;
  }
}
