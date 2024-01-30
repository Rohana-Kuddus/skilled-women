import { createSlice } from "@reduxjs/toolkit";

const industrySlice = createSlice({
  name: 'industry',
  initialState: {
    industry: []
  },
  reducers: {
    setIndustry(state, action) {
      state.industry = action.payload;
    }
  }
});

export const { setIndustry } = industrySlice.actions;

// function get industries

export default industrySlice.reducer;