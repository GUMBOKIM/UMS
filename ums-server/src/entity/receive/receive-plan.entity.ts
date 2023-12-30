import { Company } from '@entity/base';
import { ReceivePlanPart } from '@entity/receive/receive-plan-part.entity';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ReceiveCategory } from './receive-category.entity';

export enum ReceiveStatus {
  CREATE = 'CREATE',
  COMPLETE = 'COMPLETE',
  CANCEL = 'CANCEL',
}

const ReceivePlanTableName = 'receive_plan';

@Entity(ReceivePlanTableName)
export class ReceivePlan extends UMSBaseEntity {
  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  supplier: Company;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  provider: Company;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  order: number;

  @ManyToOne(() => ReceiveCategory, (receiveCategory) => receiveCategory.id, {
    eager: true,
  })
  category: ReceiveCategory;

  @Column({ nullable: true })
  carNumber?: string;

  @Column({ nullable: true })
  memo?: string;

  @OneToMany(() => ReceivePlanPart, (detail) => detail.plan)
  parts: ReceivePlanPart[];

  @Column({ type: 'enum', enum: ReceiveStatus })
  receiveStatus: ReceiveStatus;
}
