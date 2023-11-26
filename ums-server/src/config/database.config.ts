import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Entities from '../entity';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'gumbo',
  password: 'developer-gumbo',
  database: 'union_mgmt',
  entities: Entities,
  synchronize: true,
} as TypeOrmModuleOptions;
