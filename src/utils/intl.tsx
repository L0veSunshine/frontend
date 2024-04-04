/**
 *
 * @author Xuan
 * @since 2024/4/4 上午 01:14
 */
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import DefaultI18n from './defaultI18n.ts';

type IntlCtxType = {
  trans(key: string): string
}

function createNamedContext<T>(name: string, defaultValue: T) {
  const context = createContext<T>(defaultValue);
  context.displayName = name;
  return context;
}

const IntlCtx = createNamedContext<IntlCtxType>('intlContext', null as any);

function IntlProvider(props: { lang: string, children: React.ReactNode }) {
  const { lang, children } = props;
  const intl = useRef<ReturnType<typeof createIntl> | null>(null);
  const isMount = useRef(false);
  if (!intl.current) {
    intl.current = createIntl();
    intl.current.loadResource(DefaultI18n);
  }
  const [value, setValue] = useState(() => ({ trans: intl.current!.translate }));

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
    } else {
      languageResLoader(lang).then(res => {
        intl.current!.loadResource(res.default);
        setValue({ trans: intl.current!.translate });
      });
    }
  }, [lang]);

  return <IntlCtx.Provider value={value}>{children}</IntlCtx.Provider>;
}

function useIntl(): IntlCtxType {
  return useContext(IntlCtx);
}

export function languageResLoader(lang: string): Promise<Record<'default', Record<string, any>>> {
  switch (lang) {
    case 'en-US':
      return import('../../assets/i18n/string.en-US.json');
    default:
      return new Promise(resolve => resolve({ 'default': DefaultI18n }));
  }
}

function createIntl() {
  let resource: Record<string, string>;

  function loadResource(res: Record<string, string>) {
    resource = res;
  }

  function translate(key: string) {
    if (resource != null && key in resource) {
      return resource[key];
    }
    return key;
  }

  return {
    loadResource,
    translate
  };
}

export { IntlCtx, useIntl, IntlProvider };