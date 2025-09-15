import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';

const mocks = vi.hoisted(() => ({ baseQuery: vi.fn() }));
vi.mock('@/config/axiosBaseQuery', () => ({
  axiosBaseQuery: () => mocks.baseQuery,
}));

import {
  githubApiSlice,
  useGetReposQuery,
  useLazyGetReposQuery,
} from '../githubServices';

function createStore() {
  return configureStore({
    reducer: { [githubApiSlice.reducerPath]: githubApiSlice.reducer },
    middleware: (gDM) =>
      gDM({ serializableCheck: false, immutableCheck: false }).concat(
        githubApiSlice.middleware
      ),
  });
}

function wrapperFactory(store: ReturnType<typeof createStore>) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  };
}

beforeEach(() => {
  vi.restoreAllMocks();
  mocks.baseQuery.mockReset();
  localStorage.clear();
});

describe('githubServices - getRepos', () => {
  it('calls GET /github/:username/repos', async () => {
    mocks.baseQuery.mockImplementation(async ({ url, method }) => {
      expect(url).toBe('/github/john%20doe/repos');
      expect(method).toBe('GET');
      return { data: [] };
    });

    const store = createStore();
    const { result } = renderHook(() => useGetReposQuery('john doe'), {
      wrapper: wrapperFactory(store),
    });

    await waitFor(() =>
      expect(result.current.isSuccess || result.current.isError).toBeTruthy()
    );
    expect(result.current.data).toEqual([]);
  });

  it('lazy query triggers on demand', async () => {
    mocks.baseQuery.mockImplementation(async ({ url, method }) => {
      expect(url).toBe('/github/jane/repos');
      expect(method).toBe('GET');
      return { data: [{ id: 1, name: 'r1' }] };
    });

    const store = createStore();
    const { result } = renderHook(() => useLazyGetReposQuery(), {
      wrapper: wrapperFactory(store),
    });
    const [trigger] = result.current;

    const promise = trigger('jane');
    await waitFor(() => expect(promise).resolves.toBeTruthy());
  });
});
