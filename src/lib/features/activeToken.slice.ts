import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';

type ActiveTokenState = {
  activeToken: string | null;
};

const initialState: ActiveTokenState = {
  activeToken: null,
};

const activeTokenStateReducer = createSlice({
  name: 'token',
  initialState,
  reducers: {
    tokenGet(state, action: PayloadAction<string>) {
      state.activeToken = action.payload;
    },
    tokenDelete(state) {
      state.activeToken = null;
    },
  },
});

export const { tokenGet, tokenDelete } = activeTokenStateReducer.actions;
export default activeTokenStateReducer.reducer;
