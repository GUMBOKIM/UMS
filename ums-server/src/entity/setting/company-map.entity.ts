import { Company } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Entity, Index, ManyToOne } from 'typeorm';

const CompanyMapTableName = 'company_map';

@Entity(CompanyMapTableName)
@Index(['supplier', 'provider', 'customer'], { unique: true })
export class CompanyMap extends UMSBaseEntity {
  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  supplier: Company;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  provider: Company;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  customer: Company;
}
