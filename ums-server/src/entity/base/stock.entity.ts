import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Part } from './part.entity';

export const StockTableName = 'stock' as const;

@Entity(StockTableName)
export class Stock extends UMSBaseEntity {
  @ManyToOne(() => Part, (part) => part.id)
  part: Part;

  @Column()
  lot: string;

  @Column({ default: 0 })
  amount: number;
}
