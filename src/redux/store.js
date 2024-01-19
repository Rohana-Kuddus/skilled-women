import { configureStore } from "@reduxjs/toolkit";
import alert from "./slices/alertSlice"

const store = configureStore({
  reducer: {
    alert
  }
});

export default store;