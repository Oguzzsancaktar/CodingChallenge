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
  profileApiSlice,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../profileServices';

function createStore() {
  return configureStore({
    reducer: { [profileApiSlice.reducerPath]: profileApiSlice.reducer },
    middleware: (gDM) =>
      gDM({ serializableCheck: false, immutableCheck: false }).concat(
        profileApiSlice.middleware
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

describe('profileServices - getProfile', () => {
  it('calls GET /profile and returns profile', async () => {
    const profile = { id: 'u1', email: 'john@doe.com', name: 'John' };
    mocks.baseQuery.mockImplementation(async ({ url, method }) => {
      expect(url).toBe('/profile');
      expect(method).toBe('GET');
      return { data: profile };
    });

    const store = createStore();
    const { result } = renderHook(() => useGetProfileQuery(), {
      wrapper: wrapperFactory(store),
    });

    await waitFor(() =>
      expect(result.current.isSuccess || result.current.isError).toBeTruthy()
    );
    expect(result.current.data).toEqual(profile);
  });
});

describe('profileServices - updateProfile', () => {
  it('calls PUT /profile and invalidates cache', async () => {
    const updated = { id: 'u1', email: 'john@doe.com', name: 'Johnny' };

    // First call responds to GET
    let hasUpdated = false;
    mocks.baseQuery.mockImplementation(async ({ url, method, data }) => {
      if (method === 'GET') {
        return {
          data: hasUpdated
            ? updated
            : { id: 'u1', email: 'john@doe.com', name: 'John' },
        };
      }
      expect(url).toBe('/profile');
      expect(method).toBe('PUT');
      expect(data).toEqual({ name: 'Johnny', email: 'john@doe.com' });
      hasUpdated = true;
      return { data: updated };
    });

    const store = createStore();
    const wrapper = wrapperFactory(store);

    // Mount GET query
    const getHook = renderHook(() => useGetProfileQuery(), { wrapper });
    await waitFor(() => expect(getHook.result.current.isSuccess).toBeTruthy());

    // Trigger update mutation
    const updateHook = renderHook(() => useUpdateProfileMutation(), {
      wrapper,
    });
    const promise = updateHook.result.current[0]({
      name: 'Johnny',
      email: 'john@doe.com',
    });
    await waitFor(() => expect(promise).resolves.toBeTruthy());

    // After invalidation, GET should refetch. We simulate by letting RTKQ dispatch invalidation; our baseQuery returns updated on any subsequent GET
    await waitFor(() => {
      // Re-rendered data should eventually be updated (depends on RTK Query refetch after invalidation)
      const data = getHook.result.current.data;
      if (!data) throw new Error('No data yet');
      expect(data).toEqual(updated);
    });
  });
});
