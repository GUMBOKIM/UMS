import { Company } from '@entity/base';
import { ReceivePlanPart } from '@entity/receive/receive-plan-part.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReceiveCategory } from './receive-category.entity';

export enum ReceiveStatus {
  CREATE = 'CREATE',
  COMPLETE = 'COMPLETE',
  CANCEL = 'CANCEL',
}

const ReceivePlanTableName = 'receive_plan';

@Entity(ReceivePlanTableName)
export class ReceivePlan {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Company, (company) => company.id)
  supplier: Company;

  @ManyToOne(() => Company, (company) => company.id)
  provider: Company;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  order: number;

  @Column()
  category: ReceiveCategory;

  @Column({ nullable: true })
  carNumber?: string;

  @Column({ nullable: true })
  memo?: string;

  @OneToMany(() => ReceivePlanPart, (detail) => detail.plan)
  parts: ReceivePlanPart[];

  @Column({ type: 'enum', enum: ReceiveStatus })
  receiveStatus: ReceiveStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
