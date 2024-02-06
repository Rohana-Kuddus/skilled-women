import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const citySlice = createSlice({
  name: 'city',
  initialState: {
    city: [],
    message: ''
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload.data;
      state.message = action.payload.message;
    }
  }
});

export const { setCity } = citySlice.actions;

// function get cities
export const getCity = () => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/cities',
      responseType: 'json'
    });

    return dispatch(setCity({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setCity({ data: [], message: err.response.data.message }));
  };
};

export default citySlice.reducer;