import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    course: [],
    courseDetail: {},
    message: ''
  },
  reducers: {
    setCourse(state, action) {
      state.course = action.payload.data;
      state.message = action.payload.message;
    },
    setCourseDetail(state, action) {
      state.courseDetail = action.payload.data;
      state.message = action.payload.message;
    },
    setMessage(state, action) {
      state.message = action.payload;
    }
  }
});

export const { setCourse, setCourseDetail } = courseSlice.actions;

// function get class by roadmap
export const getClassRoadmap = (jobId, roadmapId) => {
  return async (dispatch) => {
    const { data } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/jobs/${jobId}/roadmaps/${roadmapId}/classes`,
      responseType: 'json'
    });
    
    dispatch(setCourse(data));
  };
};

// function get detail class
export const getClass = (token, classId) => {
  return async (dispatch) => {
    const { data } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      responseType: 'json'
    });

    dispatch(setCourseDetail(data));
  };
};

// function submit class recommendation
export const submitClass = (token, payload) => {
  return async (dispatch) => {
    const { data: { message } } = await axios({
      method: 'post',
      url: 'https://skilled-women-be-production.up.railway.app/classes',
      headers: {
        'Authorization': token
      },
      data: payload
    });

    dispatch(setMessage(message));
  };
};

// function edit class recommendation
export const editClass = (token, classId, payload) => {
  return async (dispatch) => {
    const { data: { message } } = await axios({
      method: 'put',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      data: payload
    });

    dispatch(setMessage(message));
  };
};

// function vote class
export const voteClass = (token, classId, payload) => {
  return async (dispatch) => {
    const { data: { message } } = await axios({
      method: 'patch',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      data: payload
    });

    dispatch(setMessage(message));
  };
};

// function delete class
export const deleteClass = (token, classId) => {
  return async (dispatch) => {
    const { data: { message } } = await axios({
      method: 'post',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      }
    });

    dispatch(setMessage(message));
  };
};

export default courseSlice.reducer;