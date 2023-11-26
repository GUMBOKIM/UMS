import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company';

export enum MemberStatus {
  NOT_APPROVED = 'NOT_APPROVED',
  APPROVED = 'APPROVED',
  DISABLED = 'DISABLED',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ unique: true })
  account: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  memo?: string;

  @ManyToOne(() => Company, (company) => company.id)
  company: Company;

  @Column({ type: 'enum', enum: MemberStatus })
  status: MemberStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
