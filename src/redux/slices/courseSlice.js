import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
export const getClassRoadmap = (jobId, roadmapId) => {
  return async (dispatch) => {
    const { data: { data } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/jobs/${jobId}/roadmaps/${roadmapId}/classes`,
      responseType: 'json'
    });
    
    dispatch(setCourse(data));
  };
};

// function get detail class

// function submit class recommendation

// function edit class recommendation

// function vote class

// function delete class

export default courseSlice.reducer;