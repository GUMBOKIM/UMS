import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Session } from '../auth/session/session.entity';
import { Entities } from '../entity/entities';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'gumbo',
  password: 'developer-gumbo',
  database: 'union_mgmt',
  entities: [...Entities, Session],
  // synchronize: true,
  logging: ['query', 'error'],
  logger: 'simple-console',
} as TypeOrmModuleOptions;
