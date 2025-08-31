require('dotenv').config();
const fs = require('fs');

const ssl = process.env.DB_SSL === 'true'
  ? {
      rejectUnauthorized: false,
      ca: process.env.DB_SSL_CA ? fs.readFileSync(process.env.DB_SSL_CA).toString() : undefined,
    }
  : false;

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl,
  synchronize: false,
  migrationsRun: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: ['./src/modules/**/typeorm/entities/*.{ts,js}'],
  migrations: ['./src/shared/typeorm/migrations/*.{ts,js}'],
};
