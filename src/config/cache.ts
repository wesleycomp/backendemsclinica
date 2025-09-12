// src/config/cache.ts
import { RedisOptions } from "ioredis";

type Driver = "redis" | "memory";

interface ICacheConfig {
  driver: Driver;
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: (process.env.CACHE_DRIVER as Driver) || "memory", // 🔹 memory por padrão
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;

