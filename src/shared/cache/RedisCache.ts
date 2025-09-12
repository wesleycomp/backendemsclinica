// src/shared/cache/RedisCache.ts
type Json = any;

class RedisCache {
  private memory = new Map<string, string>();

  public async save(key: string, value: Json, expireSeconds?: number): Promise<void> {
    const payload = JSON.stringify(value);
    this.memory.set(key, payload);
    if (expireSeconds && expireSeconds > 0) {
      const t = setTimeout(() => this.memory.delete(key), expireSeconds * 1000);
      // @ts-ignore
      t.unref?.();
    }
  }

  public async recover<T = Json>(key: string): Promise<T | null> {
    const data = this.memory.get(key);
    if (!data) return null;
    try { return JSON.parse(data) as T; } catch { return null; }
  }

  public async invalidate(key: string): Promise<void> {
    this.memory.delete(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    for (const k of Array.from(this.memory.keys())) {
      if (k.startsWith(`${prefix}:`)) this.memory.delete(k);
    }
  }
}

export default new RedisCache();
