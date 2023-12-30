import { Part } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ForwardPlan } from './forward-plan.entity';

@Entity()
export class ForwardPart extends UMSBaseEntity {
  @ManyToOne(() => ForwardPlan, (receivePlan) => receivePlan.id)
  plan: ForwardPlan;

  @ManyToOne(() => Part, (part) => part.id)
  part: Part;

  @Column()
  lot: string;

  @Column()
  amount: number;

  @Column()
  memo?: string;
}
