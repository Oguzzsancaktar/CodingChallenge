import React, { type PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';

// Consumers will import API slices from source files inside tests

export function createTestStore(reducers: Record<string, any>) {
  return configureStore({
    reducer: reducers,
    middleware: (getDefault) =>
      getDefault({ serializableCheck: false, immutableCheck: false }),
  });
}

export function renderWithStore(
  ui: React.ReactElement,
  reducers: Record<string, any>,
  options?: RenderOptions
) {
  const store = createTestStore(reducers);
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}
