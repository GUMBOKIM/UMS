import { Part } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ReceivePlan } from './receive-plan.entity';

const ReceivePlanPartTableName = 'receive_plan_part';

@Entity(ReceivePlanPartTableName)
export class ReceivePlanPart extends UMSBaseEntity {
  @ManyToOne(() => ReceivePlan, (receivePlan) => receivePlan.id)
  plan: ReceivePlan;

  @ManyToOne(() => Part, (part) => part.id, { eager: true })
  part: Part;

  @Column()
  lot: string;

  @Column()
  amount: number;

  @Column()
  memo?: string;
}
