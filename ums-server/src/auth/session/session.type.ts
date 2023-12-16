import { CompanyType } from '../../entity/base/company.entity';

export interface LoginMember {
  id: number;
  account: string;
  email?: string;
  phone?: string;
  memo?: string;
  company: {
    id: number;
    name: string;
    type: CompanyType;
  };
}
