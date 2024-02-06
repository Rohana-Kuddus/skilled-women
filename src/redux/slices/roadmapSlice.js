import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState: {
    roadmap: [],
    message: ''
  },
  reducers: {
    setRoadmap(state, action) {
      state.roadmap = action.payload.data;
      state.message = action.payload.message;
    }
  }
});

export const { setRoadmap } = roadmapSlice.actions;

// function get roadmap by job
export const getRoadmap = (jobId) => async (dispatch) => {
  try {
    const { data: { data, message } } = await axios({
      method: 'get',
      url: `https://skilled-women-be-production.up.railway.app/jobs/${jobId}/roadmaps`,
      responseType: 'json'
    });

    return dispatch(setRoadmap({ data, message }));
  } catch (err) {
    console.log(err);
    return dispatch(setRoadmap({ data: [], message: err.response.data.message }));
  };
};

  export default roadmapSlice.reducer;