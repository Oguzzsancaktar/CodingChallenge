// setupTests.ts - vitest setup for frontend
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// React Testing Library cleanup between tests
afterEach(() => {
  cleanup()
})

// Minimal localStorage mock for Node/jsdom
if (!('localStorage' in globalThis)) {
  const store = new Map<string, string>()
  globalThis.localStorage = {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => { store.set(key, String(value)) },
    removeItem: (key: string) => { store.delete(key) },
    clear: () => { store.clear() },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    get length() { return store.size }
  }
}

// Silence console.error in tests unless explicitly asserted
vi.spyOn(console, 'error').mockImplementation(() => { })
