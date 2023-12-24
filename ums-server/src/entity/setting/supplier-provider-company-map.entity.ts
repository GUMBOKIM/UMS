import { Company } from '@entity/base';
import {
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const SupplierProviderCompanyMapTableName = 'supplier_provider_company_map';

@Entity(SupplierProviderCompanyMapTableName)
@Index(['supplier', 'provider'], { unique: true })
export class SupplierProviderCompanyMap {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  supplier: Company;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  provider: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
