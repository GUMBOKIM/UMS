import databaseConfig from '@config/database.config.local';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const seederOptions: DataSourceOptions & SeederOptions = {
  ...databaseConfig,
  dropSchema: true,
  synchronize: true,
  seeds: ['src/database/seed/**/*{.ts,.js}'],
  factories: ['src/database/factory/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(seederOptions);
