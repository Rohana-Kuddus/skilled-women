import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    job: [],
    roadmap: [],
    jobDetail: {}
  },
  reducers: {
    setJob(state, action) {
      state.job = action.payload;
    },
    setRoadmap(state, action) {
      state.roadmap = action.payload;
    },
    setJobDetail(state, action) {
      state.jobDetail = action.payload;
    }
  }
});

export const { setJob, setRoadmap, setJobDetail } = jobSlice.actions;

// function get all job + filter search and industry

// function get job detail

// function get roadmap by job

export default jobSlice.reducer;