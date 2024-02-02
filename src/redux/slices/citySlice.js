import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const citySlice = createSlice({
  name: 'city',
  initialState: {
    city: []
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    }
  },
  extraReducers: {
    [getCities.fullfilled]: (state, action) => {
      return [...action.payload];
    },
  }
});

export const { setCity } = citySlice.actions;

// function get cities

export const getCities = createAsyncThunk(
  "cities/getCities",
  async() => {
    const response = await axios.get("https://skilled-women-be-production.up.railway.app/cities");
    return response.data;
  });

export default citySlice.reducer;