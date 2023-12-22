import { Session } from '@auth/session/session.entity';
import { Entities } from '@entity/entities';
import { DataSourceOptions } from 'typeorm';

const LocalDataBaseConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'developer-gumbo',
  database: 'union_mgmt',
  entities: [...Entities, Session],
  logging: ['query', 'error'],
  logger: 'simple-console',
} as DataSourceOptions;

export default LocalDataBaseConfig;
