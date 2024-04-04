/**
 *
 * @author Xuan
 * @since 2024/4/3 上午 12:07
 */
function getBrowserLang(): string {
  if (window) {
    return window.navigator.language;
  }
  return 'en-US';
}

function getStorageValue(container: 'sessionStorage' | 'localStorage', key: string) {
  return window[container].getItem(key);
}

export { getBrowserLang };