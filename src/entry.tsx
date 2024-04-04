import React from 'react';
import { createRoot } from 'react-dom/client';
import store, { useSelector } from './store/store';
import { Provider } from 'react-redux';
import { IntlProvider } from './utils/intl.tsx';
import App from './app';

const GlobalCtx = (props: { children: React.ReactNode }) => {
  const { lang } = useSelector(state => state.global);
  return <IntlProvider lang={lang} children={props.children}/>;
};

const Entry = () => {
  return (
    <Provider store={store}>
      <GlobalCtx>
        <App/>
      </GlobalCtx>
    </Provider>
  );
};

const root = document.getElementById('app-root') as HTMLElement;
createRoot(root).render(<Entry/>);