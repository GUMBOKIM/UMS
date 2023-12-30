import { Company } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ForwardFactory extends UMSBaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Company, (company) => company.id)
  supplier: Company;
}
