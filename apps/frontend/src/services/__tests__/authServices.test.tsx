import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';

// Hoisted mock for base query so service uses it on import
const mocks = vi.hoisted(() => ({ baseQuery: vi.fn() }));
vi.mock('@/config/axiosBaseQuery', () => ({
  axiosBaseQuery: () => mocks.baseQuery,
}));

import { authApiSlice, useLoginMutation } from '../authServices';

function createStore() {
  return configureStore({
    reducer: { [authApiSlice.reducerPath]: authApiSlice.reducer },
    middleware: (gDM) =>
      gDM({ serializableCheck: false, immutableCheck: false }).concat(
        authApiSlice.middleware
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

describe('authServices - login', () => {
  it('sends POST to AUTH.LOGIN and stores token on success', async () => {
    const successData = { token: 'abc123', userId: 'u1' };

    mocks.baseQuery.mockImplementation(async ({ url, method, data }) => {
      expect(url).toBe('/auth/login');
      expect(method).toBe('POST');
      expect(data).toEqual({ email: 'john@doe.com' });
      return { data: successData };
    });

    const store = createStore();
    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: wrapperFactory(store),
    });

    const promise = result.current[0]({
      email: 'john@doe.com',
    });
    await waitFor(() => expect(promise).resolves.toBeTruthy());

    // Wait for queryFulfilled side effect
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('abc123');
    });
  });

  it('does not store token when request fails', async () => {
    mocks.baseQuery.mockImplementation(async () => {
      return { error: { status: 401, data: { message: 'Unauthorized' } } };
    });

    const store = createStore();
    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: wrapperFactory(store),
    });

    const promise = result.current[0]({ email: 'x@y.z' });
    await waitFor(() => expect(promise).resolves.toBeTruthy());

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
    });
  });
});
