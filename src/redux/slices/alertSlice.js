import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    status: false
  },
  reducers: {
    setAlert(state, action) {
      state.status = action.payload;
    }
  }
});

export const { setAlert } = alertSlice.actions;

// function
export const setStatus = (payload) => {
  return setAlert(payload);
};

export default alertSlice.reducer;