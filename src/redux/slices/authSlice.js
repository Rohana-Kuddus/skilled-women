import { createSlice } from "@reduxjs/toolkit";
import { setStatusCode } from "./courseSlice";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    session: false, // status logged in atau tidak (false = tidak login, true = sudah login)
    statusCode: 200
  },
  reducers: {
    setSession(state, action) {
      state.session = action.payload;
    }
  }
});

export const { setSession } = authSlice.actions;

// function cek user login

// function register
export const registerUser = (payload) => {
  return async (dispatch) => {
    await axios({
      method: 'post',
      url: 'https://skilled-women-be-production.up.railway.app/auth/register',
      data: payload
    });
  };
};


// function login + input session cookies

// function logout + clear session cookies

export default authSlice.reducer;