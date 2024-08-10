/**
 *
 * @author Xuan
 * @since 2024/8/10 下午 06:42
 */
import type { RouteItem } from './routeItem.tsx';
import { Outlet } from 'react-router-dom';
import React, { lazy } from 'react';

const DashBoardPage = lazy(() => import('../pages/dashBoard.tsx'));
const LoginPage = lazy(() => import('../pages/login.tsx'));
const SignupPage = lazy(() => import('../pages/signup.tsx'));
const SettingPage = lazy(() => import('../pages/setting.tsx'));
const RepoIndexPage = lazy(() => import('../pages/repoIndex.tsx'));
const NotFoundPage = lazy(() => import('../pages/NotFound.tsx'));
const IndexPage = lazy(() => import('../index.tsx'));


const appRoutes: RouteItem[] = [
  { path: '/login', Component: LoginPage, meta: { auth: false, title: '登录' } },
  { path: '/signup', Component: SignupPage, meta: { auth: false, title: '注册' } },
  { path: '/dashboard', Component: DashBoardPage, meta: { auth: true, title: '仪表盘' } },
  { path: '/setting', Component: SettingPage, meta: { auth: true, title: '设置' } },
  {
    path: '/:id', Component: IndexPage, meta: { title: '主页' }, children: [
      { path: '', Component: () => <h2>222111</h2>, meta: { title: '代码' } },
      {
        path: ':repo', Component: () => <Outlet />, children: [
          { path: '', Component: RepoIndexPage },
          { path: 'issues', Component: () => <h2>issue</h2>, meta: { title: 'Issues' } },
          { path: 'pulls', Component: () => <h2>pulls</h2>, meta: { title: 'Pulls' } },
          { path: 'action', Component: () => <h2>action</h2>, meta: { title: 'Action' } },
          { path: 'release', Component: () => <h2>release</h2>, meta: { title: 'Release' } },
          { path: 'wiki', Component: () => <h2>wiki</h2>, meta: { title: 'Wiki' } },
          { path: 'activities', Component: () => <h2>activities</h2>, meta: { title: 'Activities' } },
        ]
      },
    ]
  },
  { path: '/', Component: DashBoardPage, meta: { auth: false, title: 'xgit' } },
  { path: '/*', Component: NotFoundPage, meta: { auth: false, title: '404' } },
];

export default appRoutes;