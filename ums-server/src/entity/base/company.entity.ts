import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CompanyType {
  SUPPLIER = 'SUPPLIER',
  PROVIDER = 'PROVIDER',
  CUSTOMER = 'CUSTOMER',
}

export const CompanyTableName = 'company' as const;

@Entity(CompanyTableName)
export class Company {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'enum', enum: CompanyType })
  type: CompanyType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
