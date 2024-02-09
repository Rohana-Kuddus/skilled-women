import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    userImage: {},
    userMessage: ''
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.data;
      state.userMessage = action.payload.message;
    },
    setUserImage(state, action) {
      state.userImage = action.payload;
    },
    setUserMessage(state, action) {
      state.userMessage = action.payload;
    }
  }
});

export const { setUser, setUserImage, setUserMessage } = userSlice.actions;

// function get user profile
export const getUserProfile = (token) => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/users',
      headers: {
        'Authorization': token
      },
      responseType: 'json'
    });

    return dispatch(setUser({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setUser({ data: {}, message: err.response.data.message || err.message }));
  };
};

// function edit user profile
export const editUserProfile = (token, payload) => async (dispatch) => {
  try {
    const { data: { message } } = await axios({
      method: 'put',
      url: 'https://skilled-women-be-production.up.railway.app/users',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      },
      data: payload
    });

    return dispatch(setUserMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setUserMessage(err.response.data.message || err.message));
  };
}; 

// function edit user password
export const editUserPassword = (token, payload) => async (dispatch) => {
  try {
    const { data: { message } } = await axios({
      method: 'patch',
      url: 'https://skilled-women-be-production.up.railway.app/users',
      headers: {
        'Authorization': token
      },
      data: payload
    });

    return dispatch(setUserMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setUserMessage(err.response.data.message || err.message));
  };
};

// function get user profile
export const getUserImage = (token) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/users/image',
      headers: {
        'Authorization': token
      },
      responseType: 'blob'
    });

    return dispatch(setUserImage(data));
  } catch (err) {
    console.log(err);
    return dispatch(setUserMessage(''));
  };
};

export default userSlice.reducer;