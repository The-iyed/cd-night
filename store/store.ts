import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import postsSlice from './slices/postsSlice'
import coursesSlice from "./slices/coursesSlice";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    courses: coursesSlice,
  },
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector