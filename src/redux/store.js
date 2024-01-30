import { configureStore } from "@reduxjs/toolkit"
import alert from "./slices/alertSlice"
import footer from "./slices/footerSlice"
import job from "./slices/jobSlice"
import auth from "./slices/authSlice"
import city from "./slices/citySlice"
import course from "./slices/courseSlice"
import industry from "./slices/industrySlice"
import user from "./slices/userSlice"

const store = configureStore({
  reducer: {
    alert, 
    footer,
    auth,
    city,
    course,
    industry,
    job,
    user
  }
});

export default store;