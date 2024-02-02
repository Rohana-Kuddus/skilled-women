import { createSlice } from "@reduxjs/toolkit";

const footerSlice = createSlice({
  name: "footer",
  initialState: {
    text: "",
    link: "",
  },
  reducers: {
    setFooter(state, action) {
      state.text = action.payload.text;
      state.link = action.payload.link;
    },
  },
});

export const { setFooter } = footerSlice.actions;

// function
export const setFooterAnchor = (text, link) => {
  const obj = { text, link };
  return setFooter(obj);
};

export default footerSlice.reducer;