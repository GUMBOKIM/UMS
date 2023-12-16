import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getLoginMemberOnRequest } from './session.util';

export const Login = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return getLoginMemberOnRequest(request);
  },
);
