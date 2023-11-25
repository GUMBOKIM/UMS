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

@Entity()
export class Company {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: CompanyType })
  type: CompanyType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
