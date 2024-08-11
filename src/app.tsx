import React, { Suspense, useMemo } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import type { ConfigProviderProps } from 'antd';
import { ConfigProvider } from 'antd';
import { useSelector } from './store/store';
import Header from './header.tsx';
import './app.less';
import type { RouteItem } from './route/routeItem.tsx';
import { genRoutes } from './route/routeItem.tsx';
import appRoutes from './route/routes.tsx';
import zh_CN from 'antd/locale/zh_CN';
import en_US from 'antd/locale/en_US';
import type { Locale } from 'antd/es/locale';

const antdIntlMapping: Record<string, Locale> = {
  'zh-CN': zh_CN,
  'en_US': en_US
};

function App() {
  const { lang, token } = useSelector(state => state.global);
  const antdGlobalConfig = useMemo<ConfigProviderProps>(() => ({
    locale: antdIntlMapping[lang],
    componentSize: 'middle',
    prefixCls: 'x'
  }), [lang]);

  const routes: RouteItem[] = useMemo(() => appRoutes, [lang]);

  return (
    <ConfigProvider {...antdGlobalConfig}>
      <BrowserRouter>
        <Suspense>
          <Header />
          <div className="app-main-content">
            <Routes>
              {genRoutes(routes, token)}
            </Routes>
          </div>
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;