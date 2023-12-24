import { CompanyType } from '@entity/base';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AllowedCompany } from './auth.decorator';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { LoginMember } from './session/dto';
import { Login } from './session/session.decorator';
import { SessionGuard } from './session/session.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() singInDto: SignInDto, @Req() request) {
    const member = await this.authService.validateMember(singInDto);
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
