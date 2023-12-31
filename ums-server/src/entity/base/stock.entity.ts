import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Part } from './part.entity';

export const StockTableName = 'stock' as const;

@Entity(StockTableName)
export class Stock {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ManyToOne(() => Part, (part) => part.id)
  part: Part;

  @Column()
  lot: string;

  @Column({ default: 0 })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
