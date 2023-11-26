import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Company } from '../entity/company';
import { Part } from '../entity/part';
import { Member } from '../entity/member';
import { Stock } from '../entity/stock';
import ForwardEntities from '../entity/forward';
import ReceiveEntities from '../entity/receive';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'gumbo',
  password: 'developer-gumbo',
  database: 'union_mgmt',
  entities: [
    Company,
    Part,
    Member,
    Stock,
    ...ForwardEntities,
    ...ReceiveEntities,
  ],
  synchronize: true,
} as TypeOrmModuleOptions;
