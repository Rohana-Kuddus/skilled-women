import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState: {
    roadmap: []
  },
  reducers: {
    setRoadmap(state, action) {
      state.roadmap = action.payload;
    }
  }
});

export const { setRoadmap } = roadmapSlice.actions;

// function get roadmap by job
export const getRoadmap = (jobId) => {
    return async (dispatch) => {
      const { data: { data } } = await axios({
        method: 'get',
        url: `https://skilled-women-be-production.up.railway.app/jobs/${jobId}/roadmaps`,
        responseType: 'json'
      });
  
      dispatch(setRoadmap(data));
      console.log(data);
    };
  };

  export default roadmapSlice.reducer;