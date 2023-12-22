import { Company } from '@entity/base';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const ReceiveCategoryTableName = 'receive_category';

@Entity(ReceiveCategoryTableName)
export class ReceiveCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  @ManyToOne(() => ReceiveCategory, (category) => category.children)
  parent?: ReceiveCategory;

  @ManyToOne(() => ReceiveCategory, (category) => category.parent)
  children: ReceiveCategory[];

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  supplier: Company;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  provider: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
