import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    authMessage: ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.authMessage = action.payload.message;
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

    return dispatch(setToken({ token, message: 'Login Success' }));
  } catch (err) {
    console.log(err);
    return dispatch(setAuthMessage(err.response.data.message));
  };
};

// function logout + clear session cookies
export const logoutUser = () => async (dispatch) => {
  return dispatch(setToken({ token: '', message: 'Logout Success' }));
};

// function check user
export const checkUser = (payload) => async (dispatch) => {
  try {
    const { data: { message } } = await axios({
      method: 'post',
      url: 'https://skilled-women-be-production.up.railway.app/auth/user',
      data: payload
    });
    
    return dispatch(setAuthMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setAuthMessage(err.response.data.message));
  };
};

// function reset password
export const resetPassword = (payload) => async (dispatch) => {
  try {
    const { data: { message } } = await axios({
      method: 'patch',
      url: 'https://skilled-women-be-production.up.railway.app/auth/password',
      data: payload
    });
    
    return dispatch(setAuthMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setAuthMessage(err.response.data.message));
  };
};

export default authSlice.reducer;