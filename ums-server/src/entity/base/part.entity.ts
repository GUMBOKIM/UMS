import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Part {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  providerCode: string;

  @Column({ nullable: true })
  customerCode: string;

  @Column({ nullable: true })
  providerName: string;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  memo?: string;

  //TODO: TypeORM의 EventSubscriber 사용 가능한지 체크
  @Column({ default: 0 })
  amount: 0;

  @ManyToOne(() => Company, (company) => company.id)
  supplier: Company;

  @ManyToOne(() => Company, (company) => company.id)
  provider: Company;

  @ManyToOne(() => Company, (company) => company.id)
  customer: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
