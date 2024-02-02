import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    course: [],
    courseDetail: {},
    statusCode: 200
  },
  reducers: {
    setCourse(state, action) {
      state.course = action.payload;
    },
    setCourseDetail(state, action) {
      state.courseDetail = action.payload;
    },
    setStatusCode(state, action) {
      state.statusCode = action.payload;
    }
  }
});

export const { setCourse, setCourseDetail, setStatusCode } = courseSlice.actions;

// function get class by roadmap
export const getClassRoadmap = (jobId, roadmapId) => {
  return async (dispatch) => {
    const { status, data: { data } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/jobs/${jobId}/roadmaps/${roadmapId}/classes`,
      responseType: 'json'
    });
    
    dispatch(setStatusCode(status));
    dispatch(setCourse(data));
  };
};

// function get class by user
export const getClassUser = (token) => {
  return async (dispatch) => {
    const { status, data: { data } } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/users/classes',
      headers: {
        'Authorization': token
      },
      responseType: 'json'
    });
    
    dispatch(setStatusCode(status));
    dispatch(setCourse(data));
  };
};

// function get detail class
export const getClass = (token, classId) => {
  return async (dispatch) => {
    const { status, data: { data } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      responseType: 'json'
    });

    dispatch(setStatusCode(status));
    dispatch(setCourseDetail(data));
  };
};

// function submit class recommendation
export const submitClass = (token, payload) => {
  return async (dispatch) => {
    const { status } = await axios({
      method: 'post',
      url: 'https://skilled-women-be-production.up.railway.app/classes',
      headers: {
        'Authorization': token
      },
      data: payload
    });

    dispatch(setStatusCode(status));
  };
};

// function edit class recommendation
export const editClass = (token, classId, payload) => {
  return async (dispatch) => {
    const { status } = await axios({
      method: 'put',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      data: payload
    });

    dispatch(setStatusCode(status));
  };
};

// function vote class
export const voteClass = (token, classId, payload) => {
  return async (dispatch) => {
    const { status } = await axios({
      method: 'patch',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      },
      data: {
        vote: payload
      }
    });

    dispatch(setStatusCode(status));
  };
};

// function delete class
export const deleteClass = (token, classId) => {
  return async (dispatch) => {
    const { status } = await axios({
      method: 'post',
      url: `https://skilled-women-be-production.up.railway.app/classes/${classId}`,
      headers: {
        'Authorization': token
      }
    });

    dispatch(setStatusCode(status));
  };
};

export default courseSlice.reducer;