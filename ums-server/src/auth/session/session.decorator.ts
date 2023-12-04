import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoginMember } from './session.type';

export const Member = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const loginMember: LoginMember = request.member;
    return loginMember;
  },
);
