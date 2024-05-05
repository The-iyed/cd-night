import { posts } from "@/data/posts";
import { createSlice } from "@reduxjs/toolkit";

export interface ICourseState {
  data: any;
}

const initialState: ICourseState = {
  data: posts,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const course = state.data;
      course.push(action?.payload);
      state.data = course;
      return state;
    },
  },
});

export const { addCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
