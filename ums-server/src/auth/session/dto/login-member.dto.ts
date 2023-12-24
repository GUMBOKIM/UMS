import { CompanyType } from '@entity/base';

export interface LoginMember {
  id: number;
  account: string;
  email?: string;
  phone?: string;
  memo?: string;
  company: LoginMemberCompany;
}

export interface LoginMemberCompany {
  id: number;
  name: string;
  type: CompanyType;
}
