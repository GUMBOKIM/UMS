import { Company } from '@entity/base';
import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ForwardCategory extends UMSBaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Company, (company) => company.id)
  supplier: Company;
}
