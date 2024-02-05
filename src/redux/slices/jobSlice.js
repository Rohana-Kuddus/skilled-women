import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    job: [],
    jobDetail: {},
    message: ''
  },
  reducers: {
    setJob(state, action) {
      state.job = action.payload.data;
      state.message = action.payload.message;
    },
    setJobDetail(state, action) {
      state.jobDetail = action.payload.data;
      state.message = action.payload.message;
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
    
    dispatch(setJob({ data, message }));
  } catch (err) {
    console.log(err);
    dispatch(setJob({ data: [], message: err.response.data.message }))
  };
};

// function get job detail
export const getJobDetail = (jobId) => {
  return async (dispatch) => {
    const { data: { data } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/jobs/${jobId}`,
      responseType: 'json'
    });
    
    dispatch(setJobDetail(data));
  };
};

export default jobSlice.reducer;