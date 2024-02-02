import { createSlice } from "@reduxjs/toolkit";
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
  }
});

export const { setCity } = citySlice.actions;

// function get cities
export const getCity = () => {
  return async (dispatch) => {
    const { data: { data } } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/cities',
      responseType: 'json'
    });

    dispatch(setCity(data));
  };
};

export default citySlice.reducer;