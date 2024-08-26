import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import activeUserSlice from '@/lib/fetch/activeUser.slice';
import activeTokenSlice from '@/lib/fetch/activeToken.slice';

export const store = configureStore({
  reducer: {
    users: activeUserSlice,
    token: activeTokenSlice,
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
