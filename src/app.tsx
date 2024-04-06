import React, { useMemo } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import type { ConfigProviderProps } from 'antd';
import { ConfigProvider } from 'antd';
import { useSelector } from './store/store';
import Header from './header.tsx';
import Signup from './components/signup.tsx';
import Login from './components/login.tsx';
import DashBoard from './components/dashBoard.tsx';
import Index from './index.tsx';
import './app.less';
import type { RouteItem } from './route/routes.tsx';
import { genRoutes } from './route/routes.tsx';

function App() {
  const { lang, token } = useSelector(state => state.global);
  const antdGlobalConfig = useMemo<ConfigProviderProps>(() => ({
    locale: { locale: lang },
    componentSize: 'middle',
    prefixCls: 'x'
  }), [lang]);

  const routeArray: RouteItem[] = useMemo(() => [
    { path: '/', Component: Index, meta: { auth: false, title: '主页' } },
    { path: '/login', Component: Login, meta: { auth: false, title: '登录' } },
    { path: '/signup', Component: Signup, meta: { auth: false, title: '注册' } },
    { path: '/dashboard', Component: DashBoard, meta: { auth: true, title: '仪表盘' } }
  ], [lang]);

  return (
    <ConfigProvider {...antdGlobalConfig}>
      <BrowserRouter>
        <Header/>
        <div className="app-main">
          <Routes>
            {genRoutes(routeArray, token)}
          </Routes>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;