/**
 *
 * @author Xuan
 * @since 2024/4/4 上午 01:14
 */
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { AvailableLanguage } from './intlConst.ts';

interface IntlCtxType {
  trans(key: string): string;
}

function createNamedContext<T>(name: string, defaultValue: T) {
  const context = createContext<T>(defaultValue);
  context.displayName = name;
  return context;
}

const IntlCtx = createNamedContext<IntlCtxType>('intlContext', null as any);

function IntlProvider(props: { lang: string, children: React.ReactNode }) {
  const { lang, children } = props;
  const intl = useRef<ReturnType<typeof createIntl>>(createIntl());
  const isMount = useRef(false);
  void intl.current.loadResource(lang);
  const [value, setValue] = useState(() => ({ trans: intl.current!.translate }));

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
    } else {
      intl.current.loadResource(lang).then(() => {
        setValue({ trans: intl.current.translate });
      });
    }
  }, [lang]);

  return <IntlCtx.Provider value={value}>{children}</IntlCtx.Provider>;
}

function useIntl(): IntlCtxType {
  return useContext(IntlCtx);
}


function createIntl() {
  let resource: Record<string, string>;

  function loadIntlRes(lang: string): Promise<Record<'default', Record<string, any>>> {
    if (AvailableLanguage.includes(lang)) {
      return import((`../../../assets/i18n/string.${lang}.json`));
    }
    return import('../../../assets/i18n/string.en-US.json');
  }

  async function loadResource(lang: string) {
    return loadIntlRes(lang).then(res => {
      resource = res.default;
    });
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