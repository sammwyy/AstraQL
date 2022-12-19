interface CacheLoaderSettings {
  expiresIn: number;
}

interface CacheItem {
  timeout: NodeJS.Timeout;
  value: string;
}

export class CacheLoader {
  private settings: CacheLoaderSettings;
  private cache: Map<string, CacheItem>;

  constructor(settings: CacheLoaderSettings) {
    this.settings = settings;
    this.cache = new Map();
  }

  async deleteAll() {
    this.cache.forEach((item) => {
      clearTimeout(item.timeout);
    });

    this.cache.clear();
  }

  async delete(key: string) {
    const item = this.cache.get(key);
    if (item) {
      clearTimeout(item.timeout);
      this.cache.delete(key);
    }
  }

  async get(key: string): Promise<string | undefined> {
    return this.cache.get(key)?.value;
  }

  async save(key: string, value: string) {
    this.delete(key);

    const timeout = setTimeout(() => {
      this.delete(key);
    }, this.settings.expiresIn * 1000);

    const item = { timeout, value };
    this.cache.set(key, item);
  }
}
