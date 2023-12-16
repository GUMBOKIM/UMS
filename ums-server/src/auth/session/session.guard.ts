import { Reflector } from '@nestjs/core';
import { CompanyType } from '../../entity/base/company.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getLoginMemberOnRequest } from './session.util';
import { AllowCompanyMetaKey } from '../auth.decorator';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const loginMember = getLoginMemberOnRequest(request);
    if (!loginMember) {
      return false;
    }

    // Allowed Company Check
    const companyTypes = this.reflector.get<CompanyType[]>(
      AllowCompanyMetaKey,
      context.getHandler(),
    );

    if (companyTypes) {
      if (!companyTypes.includes(loginMember.company.type)) {
        return false;
      }
    }

    return true;
  }
}
