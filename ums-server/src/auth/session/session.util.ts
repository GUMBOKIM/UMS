import { LoginMember } from './dto';

export const getLoginMemberOnRequest = (
  request: any,
): LoginMember | undefined => {
  return request.session.member;
};

export const setLoginMemberOnRequest = (
  request: any,
  loginMember: LoginMember,
) => {
  request.session.member = loginMember;
};
