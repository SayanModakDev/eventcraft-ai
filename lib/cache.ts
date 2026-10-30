/**
 * High-performance in-memory LRU Response Cache for EventCraft AI.
 * Caches identical plan blueprints and refinement requests to eliminate redundant
 * LLM roundtrips and guarantee sub-millisecond responses on repeated queries.
 */

import crypto from "crypto";

interface CacheRecord<T> {
  data: T;
  expiresAt: number;
  lastAccessed: number;
}

const MAX_CACHE_ENTRIES = 100;
const DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

const memoryCache = new Map<string, CacheRecord<unknown>>();

/**
 * Computes a deterministic SHA-256 hash for arbitrary JavaScript payloads.
 *
 * @param payload Object, array, or primitive to hash
 * @returns 64-character hexadecimal SHA-256 hash
 */
export function hashPayload(payload: unknown): string {
  try {
    const serialized = JSON.stringify(payload, Object.keys(payload as object || {}).sort());
    return crypto.createHash("sha256").update(serialized || "").digest("hex");
  } catch {
    return crypto.createHash("sha256").update(String(payload)).digest("hex");
  }
}

/**
 * Retrieves a cached entry if available and not yet expired.
 *
 * @param key Cache key
 * @returns Cached data or null if missing/expired
 */
export function getCache<T>(key: string): T | null {
  const record = memoryCache.get(key) as CacheRecord<T> | undefined;
  if (!record) return null;

  const now = Date.now();
  if (now > record.expiresAt) {
    memoryCache.delete(key);
    return null;
  }

  // Update last accessed timestamp for LRU tracking
  record.lastAccessed = now;
  return record.data;
}

/**
 * Stores an item in the LRU cache with an expiration time.
 * Automatically evicts the least recently used entry if MAX_CACHE_ENTRIES is exceeded.
 *
 * @param key Cache key
 * @param data Data payload to cache
 * @param ttlMs Time-to-live in milliseconds
 */
export function setCache<T>(
  key: string,
  data: T,
  ttlMs: number = DEFAULT_TTL_MS
): void {
  const now = Date.now();

  // If cache is full, evict the least recently used entry
  if (memoryCache.size >= MAX_CACHE_ENTRIES) {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [k, item] of memoryCache.entries()) {
      if (item.lastAccessed < oldestTime) {
        oldestTime = item.lastAccessed;
        oldestKey = k;
      }
    }

    if (oldestKey) {
      memoryCache.delete(oldestKey);
    }
  }

  memoryCache.set(key, {
    data,
    expiresAt: now + ttlMs,
    lastAccessed: now,
  });
}

/**
 * Clears all cached entries (useful in unit testing).
 */
export function clearCache(): void {
  memoryCache.clear();
}
