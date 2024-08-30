import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import activeUserSlice from '@/lib/features/activeUser.slice';

export const store = configureStore({
  reducer: {
    users: activeUserSlice,
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
