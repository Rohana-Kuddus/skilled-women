import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huZG9lQGVtYWlsLmNvbSIsImlhdCI6MTcwNzI3NjAyMH0.ekptPyNAs5Vv7rw_Q-LClmDYZPtw9HvDZ7KYFBbSYYM',
    authMessage: ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setAuthMessage(state, action) {
      state.authMessage = action.payload;
    }
  }
});

export const { setToken, setAuthMessage } = authSlice.actions;

// function register
export const registerUser = (payload) => async (dispatch) => {
  try {
    const { data: { message } } = await axios({
      method: 'post',
      url: 'https://skilled-women-be-production.up.railway.app/auth/register',
      data: payload
    });

    return dispatch(setAuthMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setAuthMessage(err.response.data.message));
  };
};

// function login + input session cookies
export const loginUser = (payload) => async (dispatch) => {
  try {
    const { data: { token } } = await axios({
      method: 'post',
      url: 'https://skilled-women-be-production.up.railway.app/auth/login',
      data: payload
    });

    return dispatch(setToken(token));
  } catch (err) {
    console.log(err);
    return dispatch(setAuthMessage(err.response.data.message));
  };
};

// function logout + clear session cookies
export const logoutUser = () => async (dispatch) => {
  return dispatch(setToken(''));
};

export default authSlice.reducer;