// ormconfig.js
const fs = require('fs');

const sslEnabled = String(process.env.DB_SSL || '').toLowerCase() === 'true';
const caPath = process.env.DB_SSL_CA;

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: sslEnabled
    ? (caPath
        ? { ca: fs.readFileSync(caPath).toString(), rejectUnauthorized: true }
        : { rejectUnauthorized: false })
    : false,

  entities: ['src/modules/**/typeorm/entities/*.ts'],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/shared/typeorm/migrations',
  },

  // 🚫 nunca alterar schema em produção automaticamente
  synchronize: false,
  migrationsRun: false,
};
