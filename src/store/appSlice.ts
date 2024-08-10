/**
 *
 * @author Xuan
 * @since 2024/4/3 上午 12:37
 */

import { getLocaleFromBrowser } from '../utils/i18n/utils.ts';
import { createSlice } from '@reduxjs/toolkit';

interface AppConfig {
  lang: string,
  token: string,
  configs?: {
    ops: string[]
    [key: string]: any
  }
}

const appConfig: AppConfig = {
  lang: getLocaleFromBrowser(),
  token: '',
};

const AppSlice = createSlice({
  name: 'app',
  initialState: appConfig,
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
