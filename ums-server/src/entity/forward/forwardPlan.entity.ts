import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from '../base/company.entity';
import { ForwardCategory } from './forwardCategory.entity';
import { ForwardPart } from './forwardPart.entity';
import { ForwardFactory } from './forwardFactory.entity';

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

  @OneToMany(() => ForwardPart, (detail) => detail.plan)
  parts: ForwardPart[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
