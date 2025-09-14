// ormconfig.js
require('dotenv').config({ path: process.env.DOTENV_CONFIG_PATH });

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  // aceita DB_PASSWORD ou, como fallback, DB_PASS
  password: String(process.env.DB_PASSWORD ?? process.env.DB_PASS ?? ''),
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,

  // MUITO IMPORTANTE no build:
  entities: [
    isProd
      ? 'dist/modules/**/typeorm/entities/*.js'
      : 'src/modules/**/typeorm/entities/*.ts'
  ],
  migrations: [
    isProd
      ? 'dist/shared/typeorm/migrations/*.js'
      : 'src/shared/typeorm/migrations/*.ts'
  ],
};
