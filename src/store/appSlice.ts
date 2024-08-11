/**
 *
 * @author Xuan
 * @since 2024/4/3 上午 12:37
 */

import { getLocaleFromBrowser } from '../utils/i18n/utils.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppConfig {
  lang: string,
  token: string,
  menuCollapsed: boolean
  configs?: {
    ops: string[]
    [key: string]: any
  }
}

const appConfig: AppConfig = {
  lang: getLocaleFromBrowser(),
  token: '',
  menuCollapsed: false
};

const AppSlice = createSlice({
  name: 'app',
  initialState: appConfig,
  reducers: {
    changeLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    }
  }
});

const { actions: { changeLang, setToken }, reducer: appReducer } = AppSlice;
export { changeLang, setToken, appReducer };
