import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  displayName: null,
  email: null,
  isUserIsFirebase: false,
  stateChange: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      displayName: payload.displayName,
      email: payload.email,
      isUserIsFirebase: payload.isUserIsFirebase,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
