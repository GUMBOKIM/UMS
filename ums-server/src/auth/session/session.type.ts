import { MemberStatus } from '../../entity/base/member.entity';
import { CompanyType } from '../../entity/base/company.entity';

export interface LoginMember {
  id: number;
  account: string;
  password: string;
  email?: string;
  phone?: string;
  memo?: string;
  status: MemberStatus;
  company: {
    id: number;
    name: string;
    type: CompanyType;
  };
}
