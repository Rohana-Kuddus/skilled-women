import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
export const getIndustry = () => {
  return async (dispatch) => {
    const { data: { data } } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/industries',
      responseType: 'json'
    });

    dispatch(setIndustry(data));
  };
};

export default industrySlice.reducer;