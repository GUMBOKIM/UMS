import { Company } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Entity, Index, ManyToOne } from 'typeorm';

const ProviderCustomerCompanyMapTableName = 'provider_customer_company_map';

@Entity(ProviderCustomerCompanyMapTableName)
@Index(['provider', 'customer'], { unique: true })
export class ProviderCustomerCompanyMap extends UMSBaseEntity {
  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  provider: Company;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  customer: Company;
}