import { Company } from '@entity/base';
import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const ProviderCustomerCompanyMapTableName = 'provider_customer_company_map';

@Entity(ProviderCustomerCompanyMapTableName)
@Index(['provider', 'customer'], { unique: true })
export class ProviderCustomerCompanyMap {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  provider: Company;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  customer: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
