import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    course: [],
    courseDetail: {}
  },
  reducers: {
    setCourse(state, action) {
      state.course = action.payload;
    },
    setCourseDetail(state, action) {
      state.courseDetail = action.payload;
    }
  }
});

export const { setCourse, setCourseDetail } = courseSlice.actions;

// function get class by roadmap

// function get detail class

// function submit class recommendation

// function edit class recommendation

// function vote class

// function delete class

export default courseSlice.reducer;