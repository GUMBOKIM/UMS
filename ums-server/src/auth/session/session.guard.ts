import { CompanyType } from '@entity/base';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowCompanyMetaKey } from '../auth.decorator';
import { getLoginMemberOnRequest } from './session.util';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const loginMember = getLoginMemberOnRequest(request);
    if (!loginMember) {
      throw new UnauthorizedException('승인되지 않았습니다.');
    }

    // Allowed Company Check
    const companyTypes = this.reflector.get<CompanyType[]>(
      AllowCompanyMetaKey,
      context.getHandler(),
    );

    if (companyTypes) {
      if (!companyTypes.includes(loginMember.company.type)) {
        throw new ForbiddenException('권한이 없습니다.');
      }
    }

    return true;
  }
}
