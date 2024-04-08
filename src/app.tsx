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

const DashBoardPage = lazy(() => import('./pages/dashBoard.tsx'));
const LoginPage = lazy(() => import('./pages/login.tsx'));
const SignupPage = lazy(() => import('./pages/signup.tsx'));
const SettingPage = lazy(() => import('./pages/setting.tsx'));
const RepoIndexPage = lazy(() => import('./pages/repoIndex.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFound.tsx'));

function App() {
  const { lang, token } = useSelector(state => state.global);
  const antdGlobalConfig = useMemo<ConfigProviderProps>(() => ({
    locale: { locale: lang },
    componentSize: 'middle',
    prefixCls: 'x'
  }), [lang]);

  const routeArray: RouteItem[] = useMemo(() => [
    { path: '/login', Component: LoginPage, meta: { auth: false, title: '登录' } },
    { path: '/signup', Component: SignupPage, meta: { auth: false, title: '注册' } },
    { path: '/dashboard', Component: DashBoardPage, meta: { auth: true, title: '仪表盘' } },
    { path: '/setting', Component: SettingPage, meta: { auth: true, title: '设置' } },
    {
      path: '/:id', Component: Index, meta: { title: '主页' }, children: [
        { path: '', Component: () => <h2>222111</h2>, meta: { title: '代码' } },
        {
          path: ':repo', Component: () => <Outlet/>, children: [
            { path: '', Component: RepoIndexPage },
            { path: 'issues', Component: () => <h2>issue</h2>, meta: { title: 'Issues' } },
            { path: 'pulls', Component: () => <h2>pulls</h2>, meta: { title: 'Pulls' } },
            { path: 'action', Component: () => <h2>action</h2>, meta: { title: 'Action' } },
            { path: 'release', Component: () => <h2>release</h2>, meta: { title: 'Release' } },
            { path: 'wiki', Component: () => <h2>wiki</h2>, meta: { title: 'wiki' } },
            { path: 'activities', Component: () => <h2>activities</h2>, meta: { title: 'Activities' } },
          ]
        },
      ]
    },
    { path: '/', Component: DashBoardPage, meta: { auth: false, title: 'xgit' } },
    { path: '/*', Component: NotFoundPage, meta: { auth: false, title: '404' } },
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