import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ForwardPlan } from './forwardPlan.entity';
import { Part } from '../base/part.entity';

@Entity()
export class ForwardPart {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => ForwardPlan, (receivePlan) => receivePlan.id)
  plan: ForwardPlan;

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
