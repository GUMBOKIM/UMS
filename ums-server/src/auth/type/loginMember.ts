import { MemberStatus } from '../../entity/member';
import { CompanyType } from '../../entity/company';

export interface LoginMember {
  id: number;
  account: string;
  companyId: number;
  companyName: string;
  companyType: CompanyType;
  status: MemberStatus;
}
