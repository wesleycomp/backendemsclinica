type CacheConfig = {
  driver: 'memory' | 'redis' | string;
  config: {
    redis?: {
      host: string;
      port: number;
      password?: string;
    };
  };
};

const cache: CacheConfig = {
  driver: 'memory',
  config: {
    // deixamos aqui apenas para compatibilidade se alguém referenciar
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: undefined,
    },
  },
};

export default cache;
