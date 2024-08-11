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
const RecoverPassPage = lazy(() => import('../pages/resetPass.tsx'));
const ProfilePage = lazy(() => import('../pages/profile.tsx'));
const SettingPage = lazy(() => import('../pages/setting.tsx'));
const CodePage = lazy(() => import('../pages/code.tsx'));
const NotFoundPage = lazy(() => import('../pages/notFound.tsx'));
const RepoPage = lazy(() => import('../pages/repo.tsx'));


const appRoutes: RouteItem[] = [
  { path: '/login', Component: LoginPage, meta: { auth: false, title: '登录' } },
  { path: '/signup', Component: SignupPage, meta: { auth: false, title: '注册' } },
  { path: '/recover', Component: RecoverPassPage, meta: { auth: false, title: '找回密码' } },
  { path: '/setting', Component: SettingPage, meta: { auth: true, title: '设置' } },
  {
    path: '/:id', Component: () => <Outlet />, children: [
      { path: '', Component: ProfilePage, meta: { title: '主页' } },
      {
        path: ':repo', Component: RepoPage, children: [
          { path: '', Component: CodePage, meta: { title: '代码' } },
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
  { path: '/', Component: DashBoardPage, meta: { auth: false, title: 'XGit' } },
  { path: '/*', Component: NotFoundPage, meta: { auth: false, title: '404' } },
];

export default appRoutes;