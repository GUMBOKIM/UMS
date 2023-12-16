import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReceivePlan } from './receivePlan.entity';
import { Part } from '../base/part.entity';

@Entity()
export class ReceivePart {
  @PrimaryGeneratedColumn('increment')
  id: number;

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
