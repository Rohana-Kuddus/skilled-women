import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    class: [],
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setClass(state, action) {
      state.class = action.payload;
    },
  },
//   extraReducers: (builder) => {
//     builder.addCase(getUserProfile.fulfilled, (state, action) => {
//       state.user = action.payload;
//     });
//  }
});

export const { setUser, setClass } = userSlice.actions;


// // belum yakin sintaksnya works


// // function get user profile
// export const getUserProfile = async (userId) => {
//   const response = await axios.get(`https://skilled-women-be-production.up.railway.app/users/${userId}`);
//   return response.data;
// };

// // function edit user profile
// export const editUserProfile = async (userId, updatedData) => {
//   const response = await axios.put(`https://skilled-women-be-production.up.railway.app/users/${userId}`, updatedData);
//   return response.data;
// }; 
// // function edit user password
// export const editUserPassword = async (userId, newPassword) => {
//   const response = await axios.patch(`https://skilled-women-be-production.up.railway.app/users/${userId}/password`, { password: newPassword });
//   return response.data;
// }; 
// // function get class by user
// export const getClassByUser = async (userId) => {
//   const response = await axios.get(`https://skilled-women-be-production.up.railway.app/users/${userId}/classes`);
//   return response.data;
// }; 

export default userSlice.reducer;