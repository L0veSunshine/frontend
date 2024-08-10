/**
 *
 * @author Xuan
 * @since 2024/4/3 上午 12:07
 */
import { AvailableLanguage, LangMapping } from './intlConst.ts';

const LocaleConfigKey = 'locale';

function getLocaleFromBrowser(): string {
  const userStored = getStorageValue('localStorage', LocaleConfigKey);
  let custom: string;
  if (userStored) {
    custom = userStored;
  } else {
    custom = window.navigator.language;
  }
  return normalizeLocale(custom);
}

function normalizeLocale(userPrefer: string) {
  if (userPrefer in LangMapping) {
    return LangMapping[userPrefer];
  }
  if (AvailableLanguage.includes(userPrefer)) {
    return userPrefer;
  }
  return 'en-US';
}

function getStorageValue(container: 'sessionStorage' | 'localStorage', key: string) {
  return window[container].getItem(key);
}

function saveLocaleToBrowser(lang: string) {
  window.localStorage.setItem(LocaleConfigKey, lang);
}

function clearLocaleConfig() {
  window.localStorage.removeItem(LocaleConfigKey);
}

export { getLocaleFromBrowser, saveLocaleToBrowser, clearLocaleConfig };