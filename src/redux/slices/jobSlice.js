import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    job: []
  },
  reducers: {
    setJob(state, action) {
      state.job = action.payload;
    },
    setJobDetail(state, action) {
      state.job = action.payload;
    }
  }
});

export const { setJob, setJobDetail } = jobSlice.actions;

// function get all job + filter search and industry
export const getJobList = (industry, search) => {
  return async (dispatch) => {
    const { data: { data } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/jobs?industry=${industry}&search=${search}`,
      responseType: 'json'
    });
       dispatch(setJob(data));
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