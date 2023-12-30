import { Company } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ForwardCategory } from './forward-category.entity';
import { ForwardFactory } from './forward-factory.entity';
import { ForwardPart } from './forward-part.entity';

@Entity()
export class ForwardPlan extends UMSBaseEntity {
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
}
