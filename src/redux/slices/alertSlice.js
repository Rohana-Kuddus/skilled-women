import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    status: false,
    name: ''
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload.status;
      state.name = action.payload.name;
    }
  }
});

export const { setStatus } = alertSlice.actions;

// function
export const setAlert = (payload) => {
  return setStatus(payload);
};

export default alertSlice.reducer;