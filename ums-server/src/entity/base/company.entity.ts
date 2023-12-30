import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity } from 'typeorm';

export enum CompanyType {
  SUPPLIER = 'SUPPLIER',
  PROVIDER = 'PROVIDER',
  CUSTOMER = 'CUSTOMER',
}

export const CompanyTableName = 'company' as const;

@Entity(CompanyTableName)
export class Company extends UMSBaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'enum', enum: CompanyType })
  type: CompanyType;
}
