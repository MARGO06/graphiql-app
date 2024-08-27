import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';

type ActiveToken = {
  token: string | null;
};

const initialState: ActiveToken = {
  token: null,
};

const activeTokenStateReducer = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokenGet(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { tokenGet } = activeTokenStateReducer.actions;
export default activeTokenStateReducer.reducer;
