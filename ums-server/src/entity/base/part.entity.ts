import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Company } from './company.entity';

export const PartTableName = 'part' as const;

@Entity(PartTableName)
export class Part extends UMSBaseEntity {
  @Column()
  supplierCode: string;

  @Column()
  customerCode: string;

  @Column()
  supplierName: string;

  @Column()
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
}
