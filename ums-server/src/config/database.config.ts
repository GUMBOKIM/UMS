import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Session } from '../auth/session/session.entity';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'gumbo',
  password: 'developer-gumbo',
  database: 'union_mgmt',
  entities: ['**/*.entity{.ts}', Session],
  synchronize: true,
  logging: ['query', 'error'],
  logger: 'simple-console',
} as TypeOrmModuleOptions;
