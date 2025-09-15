import LRUCache from "lru-cache";
import { loadEnv } from "../config/env.js";

const env = loadEnv();
const cache = new LRUCache<string, unknown>({ ttl: env.GITHUB_CACHE_TTL_MS, max: 100 });

export async function fetchUserRepos(username: string): Promise<unknown> {
  const key = `repos:${username}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const headers: Record<string, string> = { 'Accept': 'application/vnd.github+json' };
  if (env.GITHUB_TOKEN) headers['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
  const resp = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos`, { headers });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `GitHub HTTP ${resp.status}`);
  }
  const data = await resp.json();
  cache.set(key, data);
  return data;
}


