import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    alert: false,
    alertName: ''
  },
  reducers: {
    setStatus(state, action) {
      state.alert = action.payload.alert;
      state.alertName = action.payload.alertName;
    }
  }
});

export const { setStatus } = alertSlice.actions;

// function
export const setAlert = (payload) => {
  return setStatus(payload);
};

export default alertSlice.reducer;