import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'core/types/firebase-user';

type AuthState = {
  user: IUser | null;
  isLoading?: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state: AuthState, action: PayloadAction<IUser>) {
      const newUser = action.payload;
      state.user = { ...newUser };
    },
    removeUser(state: AuthState) {
      state.user = null;
      state.isLoading = true;
    },
    stopIsLoading(state: AuthState) {
      state.isLoading = false;
    },
  },
});

export const userActions = authSlice.actions;

export default authSlice.reducer;
