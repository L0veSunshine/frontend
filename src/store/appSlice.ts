/**
 *
 * @author Xuan
 * @since 2024/4/3 上午 12:37
 */

import { getBrowserLang } from '../utils/common_utils';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  lang: string,
  token: string,
  configs?: {
    ops: string[]
    [key: string]: any
  }
}

const initialState: InitialState = {
  lang: getBrowserLang(),
  token: '',
};

const AppSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    changeLang(state, action) {
      state.lang = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    }
  }
});

const { actions: { changeLang, setToken }, reducer: appReducer } = AppSlice;
export { changeLang, setToken, appReducer };
