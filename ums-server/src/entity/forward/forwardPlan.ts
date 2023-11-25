import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from '../company';
import { ForwardCategory } from './forwardCategory';
import { ForwardPlanDetail } from './forwardPlanDetail';
import { ForwardFactory } from './forwardFactory';

@Entity()
export class ForwardPlan {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => Company, (company) => company.id)
  provider: Company;

  @ManyToOne(() => Company, (company) => company.id)
  customer: Company;

  @Column()
  date: Date;

  @ManyToOne(() => ForwardCategory, (receiveCategory) => receiveCategory.id)
  category: ForwardCategory;

  @ManyToOne(() => ForwardFactory, (receiveCategory) => receiveCategory.id)
  factory?: ForwardFactory;

  @Column()
  order: number;

  @Column({ nullable: true })
  carNumber?: string;

  @Column({ nullable: true })
  memo?: string;

  @OneToMany(() => ForwardPlanDetail, (detail) => detail.plan)
  details: ForwardPlanDetail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
