/**
 *
 * @author Xuan
 * @since 2024/4/5 上午 12:03
 */

import { createElement, ReactElement, ReactNode } from 'react';
import type { PathRouteProps } from 'react-router-dom';
import { Navigate, Route } from 'react-router-dom';

type ExactInfo = Omit<Record<string, any>, 'auth' | 'title'>

type AdditionInfo<T extends ExactInfo> = {
  meta?: {
    auth?: boolean
    title?: string
  } & Partial<T>;
  customEvent?: (args: T) => void
  customRetEvent?: (args: T) => ReactElement
}

type Permission = {
  token?: string
}

export type RouteItem<T extends ExactInfo = Record<string, any>> = Omit<PathRouteProps, 'children'> & AdditionInfo<T> & {
  children?: RouteItem<T>[]
}

type BaseRouteProps<T extends ExactInfo> =
  Pick<PathRouteProps, 'element'>
  & AdditionInfo<T>
  & Permission

function BaseRouteComponent<T extends ExactInfo>(props: BaseRouteProps<T>): ReactElement {
  const { meta, element, token, customEvent, customRetEvent } = props;
  const { auth, title, ...rest } = meta || {};
  if (typeof customEvent === 'function') {
    customEvent(rest as T);
  }
  if (typeof customRetEvent === 'function') {
    return customRetEvent(rest as T);
  }
  if (title) {
    document.title = title;
  }
  if (auth && !token) {
    return <Navigate to="/" />;
  }
  const component = () => element;
  return createElement(component, rest);
}

function genRoutes<T extends ExactInfo>(configs: RouteItem<T>[], token: string) {
  return configs.map((config, index) => {
    let Element: ReactNode;
    const { meta, element, Component, children, ...other } = config;
    if (Component) {
      Element = <Component />;
    }
    if (element) {
      Element = element;
    }
    let nestedRoutes: ReactNode | undefined = undefined;
    if (Array.isArray(children)) {
      nestedRoutes = genRoutes(children, token);
    }
    const renderComponent = <BaseRouteComponent element={Element} meta={meta} token={token} />;
    return <Route key={index} element={renderComponent} children={nestedRoutes} {...other} />;
  });
}

export { genRoutes };
