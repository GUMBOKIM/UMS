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
import { ReceiveCategory } from './receiveCategory.entity';
import { ReceivePart } from './receivePart.entity';

@Entity()
export class ReceivePlan {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @OneToMany(() => ReceivePart, (detail) => detail.plan)
  parts: ReceivePart[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
