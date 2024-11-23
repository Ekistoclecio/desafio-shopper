import '../module-aliases';

import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import env from '@/config/env';

const { dbConfig } = env;

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: dbConfig.entitiesPath,
  migrations: dbConfig.migrationsPath,
  seeds: dbConfig.seedsPath,
  logging: false,
};

export const MainDataSource = new DataSource(dataSourceOptions);
