/**
 *
 * @author Xuan
 * @since 2024/4/3 上午 12:04
 */

import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';
import { useDispatch as reduxUseDispatch, useSelector as reduxUseSelector } from 'react-redux';


const store = configureStore({
  reducer: {
    global: appReducer
  }
});

type RootState = ReturnType<typeof store.getState>
type StoreDispatch = typeof store.dispatch
export const useDispatch = reduxUseDispatch.withTypes<StoreDispatch>();
export const useSelector = reduxUseSelector.withTypes<RootState>();

export default store;