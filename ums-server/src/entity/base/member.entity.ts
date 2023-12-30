import { UMSBaseEntity } from '@entity/ums-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Company } from './company.entity';

export const MemberTableName = 'member' as const;

@Entity(MemberTableName)
export class Member extends UMSBaseEntity {
  @Column({ unique: true })
  account: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  memo?: string;

  @ManyToOne(() => Company, (company) => company.id, { eager: true })
  company: Company;
}
