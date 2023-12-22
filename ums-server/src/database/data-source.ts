import LocalDataBaseConfig from '@config/database.local.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const seederOptions: DataSourceOptions & SeederOptions = {
  ...LocalDataBaseConfig,
  dropSchema: true,
  synchronize: true,
  seeds: ['src/database/seed/**/*{.ts,.js}'],
  factories: ['src/database/factory/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(seederOptions);
