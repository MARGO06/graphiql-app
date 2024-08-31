import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    //TODO
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
