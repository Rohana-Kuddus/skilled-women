import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    message: ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setAuthMessage(state, action) {
      state.message = action.payload;
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

const obj = {
  email: "johndoe@email.com",
  password: "4321"
};

// function login + input session cookies
export const loginUser = (payload) => async (dispatch) => {
  try {
    const { data: { token } } = await axios({
      method: 'post',
      url: 'https://skilled-women-be-production.up.railway.app/auth/login',
      data: obj
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