import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { Person } from '@/types/person';

export type ActiveUserState = {
  activeUserDetails: Person[];
};

const initialState: ActiveUserState = {
  activeUserDetails: [],
};

const activeUserStateReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded(state, action: PayloadAction<Person>) {
      state.activeUserDetails.push(action.payload);
    },
  },
});

export const { userAdded } = activeUserStateReducer.actions;
export default activeUserStateReducer.reducer;
