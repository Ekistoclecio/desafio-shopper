import '../module-aliases'

import { DataSource, DataSourceOptions } from "typeorm";
import env from "@/config/env";


const { dbConfig } = env;

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: dbConfig.entitiesPath,
  migrations: dbConfig.migrationsPath,
  logging: false,
};

export const MainDataSource = new DataSource(dataSourceOptions);
