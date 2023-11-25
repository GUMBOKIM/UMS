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
import { ReceiveCategory } from './receiveCategory';
import { ReceivePlanDetail } from './receivePlanDetail';

@Entity()
export class ReceivePlan {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => Company, (company) => company.id)
  supplier: Company;

  @ManyToOne(() => Company, (company) => company.id)
  provider: Company;

  @Column()
  date: Date;

  @ManyToOne(() => ReceiveCategory, (receiveCategory) => receiveCategory.id)
  category: ReceiveCategory;

  @Column()
  order: number;

  @Column({ nullable: true })
  carNumber?: string;

  @Column({ nullable: true })
  memo?: string;

  @OneToMany(() => ReceivePlanDetail, (detail) => detail.plan)
  details: ReceivePlanDetail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
