import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    job: [],
    jobDetail: {},
    jobMessage: ''
  },
  reducers: {
    setJob(state, action) {
      state.job = action.payload.data;
      state.jobMessage = action.payload.message;
    },
    setJobDetail(state, action) {
      state.jobDetail = action.payload.data;
      state.jobMessage = action.payload.message;
    }
  }
});

export const { setJob, setJobDetail } = jobSlice.actions;

// function get all job + filter search and industry
export const getJobList = (params = '') => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: 'https://skilled-women-be-production.up.railway.app/jobs',
      params,
      responseType: 'json'
    });
    
    return dispatch(setJob({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setJob({ data: [], message: err.response.data.message }));
  };
};

// function get job detail
export const getJobDetail = (jobId) => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/jobs/${jobId}`,
      responseType: 'json'
    });
    
    return dispatch(setJobDetail({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setJobDetail({ data: {}, message: err.response.data.message }));
  };
};

export default jobSlice.reducer;