import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toast: false,
    toastName: ''
  },
  reducers: {
    setToast(state, action) {
      state.toast = action.payload.toast;
      state.toastName = action.payload.toastName;
    }
  }
});

export const { setToast } = toastSlice.actions;

// function
export const getToast = (payload) => {
  return setToast(payload);
};

export default toastSlice.reducer;