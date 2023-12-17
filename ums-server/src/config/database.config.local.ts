import { Session } from '@auth/session/session.entity';
import { Entities } from '@entity/entities';
import { DataSourceOptions } from 'typeorm';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'gumbo',
  password: 'developer-gumbo',
  database: 'union_mgmt',
  entities: [...Entities, Session],
  logging: ['query', 'error'],
  logger: 'simple-console',
} as DataSourceOptions;
