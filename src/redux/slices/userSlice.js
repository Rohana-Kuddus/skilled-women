import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    class: []
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setClass(state, action) {
      state.class = action.payload;
    }
  }
});

export const { setUser, setClass } = userSlice.actions;

// function get user profile

// function edit user profile

// function edit user password

// function get class by user

export default userSlice.reducer;