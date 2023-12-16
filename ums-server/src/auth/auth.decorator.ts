import { CompanyType } from '../entity/base/company.entity';
import { SetMetadata } from '@nestjs/common';

export const AllowCompanyMetaKey = 'allowed_company' as const;
export const AllowedCompany = (...companyTypes: CompanyType[]) =>
  SetMetadata(AllowCompanyMetaKey, companyTypes);
