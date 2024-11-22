import { config } from 'dotenv';

config();

const vars = process.env;

const env = {
  serverPort: vars.SERVER_PORT ?? 8080,
  dbConfig: {
    host: vars.DB_HOST && vars.NODE_ENV === 'production' ? vars.DB_HOST : 'localhost',
    port: parseInt(vars.DB_PORT ?? '5432'),
    username: vars.DB_USERNAME ?? 'postgres',
    password: vars.DB_PASSWORD ?? 'postgres',
    database: vars.DB_NAME ?? 'postgres_db',
    entitiesPath: vars.DB_ENTITIES ? [vars.DB_ENTITIES] : ['**/**/entity.ts'],
    migrationsPath: vars.DB_MIGRATIONS ? [vars.DB_MIGRATIONS] : ['**/database/migrations/**/*.ts'],
  },
};

export default env;
