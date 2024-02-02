import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const getIndustries = createAsyncThunk(
  "industries/getIndustries",
  async() => {
    const response = await axios.get("https://skilled-women-be-production.up.railway.app/industries");
    return response.data;
  });

export default industrySlice.reducer;