import { config } from 'dotenv';

config();

const vars = process.env;

const IS_PRODUCTION = vars.NODE_ENV === 'production' && !process.env.TYPEORM_CLI;
const FILE_EXTENSION = IS_PRODUCTION ? 'js' : 'ts';

const DB_ENTITIES = [`**/**/entity.${FILE_EXTENSION}`];
const DB_MIGRATIONS = [`**/database/migrations/**/*.${FILE_EXTENSION}`];
const DB_SEEDS = [`**/database/seeds/**/*.${FILE_EXTENSION}`];

const env = {
  serverPort: vars.SERVER_PORT ?? 8080,
  dbConfig: {
    host: vars.DB_HOST && vars.NODE_ENV === 'production' ? vars.DB_HOST : 'localhost',
    port: parseInt(vars.DB_PORT ?? '5432'),
    username: vars.DB_USERNAME ?? 'postgres',
    password: vars.DB_PASSWORD ?? 'postgres',
    database: vars.DB_NAME ?? 'postgres_db',
    entitiesPath: DB_ENTITIES,
    migrationsPath: DB_MIGRATIONS,
    seedsPath: DB_SEEDS,
  },
};

export default env;
