import { Company } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

const ReceiveCategoryTableName = 'receive_category';

@Entity(ReceiveCategoryTableName)
export class ReceiveCategory extends UMSBaseEntity {
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
}
