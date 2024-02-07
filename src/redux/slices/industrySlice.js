import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const industrySlice = createSlice({
  name: 'industry',
  initialState: {
    industry: [],
    industryMessage: ''
  },
  reducers: {
    setIndustry(state, action) {
      state.industry = action.payload.data;
      state.industryMessage = action.payload.message;
    }
  }
});

export const { setIndustry } = industrySlice.actions;

// function get industries
export const getIndustry = () => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/industries',
      responseType: 'json'
    });

    return dispatch(setIndustry({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setIndustry({ data: [], message: err.response.data.message }));
  };
};

export default industrySlice.reducer;