import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'account',
      password: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    //change username to lower case
    const member = await this.authService.validateMember(username, password);

    if (!member) {
      throw new UnauthorizedException();
    }
    console.log('validate member', member);
    return member;
  }
}

//
// const loginMember: LoginMember = {
//   account: member.account,
//   companyId: member.company.id,
//   companyName: member.company.name,
//   companyType: member.company.type,
//   id: member.id,
//   status: member.status,
// };
//
// console.log('loginMember', loginMember);
