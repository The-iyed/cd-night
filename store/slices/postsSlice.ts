import { createSlice } from '@reduxjs/toolkit'

export interface IPostState {
  data:any
}

const initialState: IPostState = {
  data: [],
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state,action) => {
      const posts = state.data
      posts.push(action?.payload)
      state.data = posts
      console.log(state.data)
      return state
    }
}})


export const { addPost } = postSlice.actions
export default postSlice.reducer