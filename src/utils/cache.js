class LightCache {
    constructor() {
      this.store = {};
    }

    set(key, value, ttl) {
      const expiresAt = Date.now() + ttl;
      this.store[key] = { value, expiresAt };
    }

    get(key) {
      const cached = this.store[key];
      if (!cached) return null;
      if (Date.now() > cached.expiresAt) {
        delete this.store[key];
        return null;
      }
      return cached.value;
    }

    has(key) {
      return this.get(key) !== null;
    }
  }

  export const feedCache = new LightCache();
