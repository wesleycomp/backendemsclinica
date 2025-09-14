import { RedisOptions } from "ioredis"

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

const redisPort = Number(process.env.REDIS_PORT ?? 6379);

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: redisPort,
      password: process.env.REDIS_PASS || undefined,
    },
  },
  driver: 'redis',
} as ICacheConfig;
