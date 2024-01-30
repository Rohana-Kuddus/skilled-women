import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    session: false // status logged in atau tidak (false = tidak login, true = sudah login)
  },
  reducers: {
    setSession(state, action) {
      state.session = action.payload;
    }
  }
});

export const { setSession } = authSlice.actions;

// function cek user login

// function register

// function login + input session cookies

// function logout + clear session cookies

export default authSlice.reducer;