import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReceivePlan } from './receivePlan';
import { Part } from '../part';

@Entity()
export class ReceivePlanDetail {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => ReceivePlan, (receivePlan) => receivePlan.id)
  plan: ReceivePlan;

  @ManyToOne(() => Part, (part) => part.id)
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
