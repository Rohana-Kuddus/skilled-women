import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: 'city',
  initialState: {
    city: []
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    }
  }
});

export const { setCity } = citySlice.actions;

// function get cities

export default citySlice.reducer;