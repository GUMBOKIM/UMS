import { Part } from '@entity/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReceivePlan } from './receive-plan.entity';

const ReceivePlanPartTableName = 'receive_plan_part';

@Entity(ReceivePlanPartTableName)
export class ReceivePlanPart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ReceivePlan, (receivePlan) => receivePlan.id)
  plan: ReceivePlan;

  @ManyToOne(() => Part, (part) => part.id, { eager: true })
  part: Part;

  @Column()
  lot: string;

  @Column()
  amount: number;

  @Column()
  memo?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
