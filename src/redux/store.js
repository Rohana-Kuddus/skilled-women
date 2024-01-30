import { configureStore } from "@reduxjs/toolkit";
import alert from "./slices/alertSlice"
import footer from "./slices/footerSlice"

const store = configureStore({
  reducer: {
    alert, 
    footer
  }
});

export default store;