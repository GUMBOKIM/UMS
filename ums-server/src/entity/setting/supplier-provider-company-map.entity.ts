import { Company } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Entity, Index, ManyToOne } from 'typeorm';

const SupplierProviderCompanyMapTableName = 'supplier_provider_company_map';

@Entity(SupplierProviderCompanyMapTableName)
@Index(['supplier', 'provider'], { unique: true })
export class SupplierProviderCompanyMap extends UMSBaseEntity {
  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  supplier: Company;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  provider: Company;
}
