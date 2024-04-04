/**
 *
 * @author Xuan
 * @since 2024/4/5 上午 12:03
 */

import { createElement, ReactNode } from 'react';
import type { PathRouteProps } from 'react-router-dom';
import { Navigate, Route } from 'react-router-dom';

type ExactInfo = Omit<Record<string, any>, 'auth' | 'title'>

type AdditionInfo<T extends ExactInfo> = {
  meta: {
    auth?: boolean
    title?: string
  } & T;
  customEvent?(args: T): void
}

type Permission = {
  token?: string
}

export type RouteItem<T extends ExactInfo = {}> = PathRouteProps & Partial<AdditionInfo<T>>

type BaseRouteProps<T extends ExactInfo> =
  Pick<PathRouteProps, 'element'>
  & Partial<AdditionInfo<T>>
  & Permission

function BaseRouteComponent<T extends ExactInfo>(props: BaseRouteProps<T>) {
  const { meta, element, token, customEvent } = props;
  const { auth, title, ...rest } = meta || {};
  if (typeof customEvent === 'function') {
    customEvent(rest as T);
  }
  if (title) {
    document.title = title;
  }
  if (auth && !token) {
    return <Navigate to="/"/>;
  }
  const component = () => element;
  return createElement(component, rest);
}

function genRoutes<T extends ExactInfo = {}>(configs: RouteItem<T>[], token: string) {
  return configs.map((config, index) => {
    let Element: ReactNode;
    const { meta, element, Component, customEvent, ...other } = config;
    if (Component) {
      Element = <Component/>;
    }
    if (element) {
      Element = element;
    }
    const renderComponent = <BaseRouteComponent element={Element} meta={meta} customEvent={customEvent} token={token}/>;
    return <Route key={index} element={renderComponent} {...other}/>;
  });
}

export { genRoutes };