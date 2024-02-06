// butuh integrasi add, edit, delete setelah integrasi job dan roadmap

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
    setCourseMessage(state, action) {
      state.message = action.payload;
    }
  }
});

export const { setCourse, setCourseDetail, setCourseMessage } = courseSlice.actions;

// function get class by roadmap
export const getClassRoadmap = (jobId, roadmapId) => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/jobs/${jobId}/roadmaps/${roadmapId}/classes`,
      responseType: 'json'
    });
    
    return dispatch(setCourse({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setCourse({ data: [], message: err.response.data.message }));
  };
};

// function get class by user
export const getClassUser = (token) => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/users/classes',
      headers: {
        'Authorization': token
      },
      responseType: 'json'
    });
    
    return dispatch(setCourse({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setCourse({ data: [], message: err.response.data.message }));
  };
};

// function get detail class
export const getClass = (token, classId) => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      responseType: 'json'
    });

    return dispatch(setCourseDetail({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setCourseDetail({ data: {}, message: err.response.data.message }));
  };
};

// function submit class recommendation
export const submitClass = (payload) => async (dispatch) => {
  try {
    const { token, data } = payload;

    const { data: { message } } = await axios({
      method: 'post',
      url: 'https://skilled-women-be-production.up.railway.app/classes',
      headers: {
        'Authorization': token
      },
      data
    });

    return dispatch(setCourseMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setCourseMessage(err.response.data.message));
  };
};

// function edit class recommendation
export const editClass = (payload) => async (dispatch) => {
  try {
    const { classId, token, data } = payload;

    const { data: { message } } = await axios({
      method: 'put',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      data
    });

    return dispatch(setCourseMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setCourseMessage(err.response.data.message));
  };
};

// function vote class
export const voteClass = (payload) => async (dispatch) => {
  try {
    const { classId, token, vote } = payload;

    const { data: { message } } = await axios({
      method: 'patch',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      data: {
        vote
      }
    });

    return dispatch(setCourseMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setCourseMessage(err.response.data.message));
  };
};

// function delete class
export const deleteClass = (payload) => async (dispatch) => {
  try {
    const { token, classId } = payload;

    const { data: { message } } = await axios({
      method: 'post',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      }
    });

    return dispatch(setCourseMessage(message));
  } catch (err) {
    console.log(err);
    return dispatch(setCourseMessage(err.response.data.message));
  };
};

export default courseSlice.reducer;