import React, { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Outlet, Routes } from 'react-router-dom';
import { ConfigProviderProps } from 'antd';
import { ConfigProvider } from 'antd';
import { useSelector } from './store/store';
import Header from './header.tsx';
import Index from './index.tsx';
import './app.less';
import type { RouteItem } from './route/routes.tsx';
import { genRoutes } from './route/routes.tsx';

const DashBoardPage = lazy(() => import('../src/components/dashBoard.tsx'));
const LoginPage = lazy(() => import('../src/components/login.tsx'));
const SignupPage = lazy(() => import('../src/components/signup.tsx'));

function App() {
  const { lang, token } = useSelector(state => state.global);
  const antdGlobalConfig = useMemo<ConfigProviderProps>(() => ({
    locale: { locale: lang },
    componentSize: 'middle',
    prefixCls: 'x'
  }), [lang]);

  const routeArray: RouteItem[] = useMemo(() => [
    {
      path: '/', Component: Index, meta: { auth: false, title: '主页' }, children: [
        { path: '/repo', Component: () => <h1>222111</h1>, meta: { auth: false, title: '代码' } },
        {
          path: '/release',
          Component: () => <><h1>3333</h1><Outlet/></>,
          meta: { auth: false, title: 'release' },
          children: [
            { path: 'python', Component: () => <h2>python</h2> }
          ]
        },
      ]
    },
    { path: '/login', Component: LoginPage, meta: { auth: false, title: '登录' } },
    { path: '/signup', Component: SignupPage, meta: { auth: false, title: '注册' } },
    { path: '/dashboard', Component: DashBoardPage, meta: { auth: true, title: '仪表盘' } }
  ], [lang]);

  return (
    <ConfigProvider {...antdGlobalConfig}>
      <BrowserRouter>
        <Suspense>
          <Header/>
          <div className="app-main-content">
            <Routes>
              {genRoutes(routeArray, token)}
            </Routes>
          </div>
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;