import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache
import HttpApi from 'i18next-http-backend'; // fallback http load

import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'de',
    debug: true,
    ns: 'menu',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    saveMissing: false,
    // saveMissingTo: 'current',
    load: 'languageOnly',

    backend: {
      backends: [
        LocalStorageBackend, // primary
        HttpApi, // fallback
      ],
      backendOptions: [
        {
          // options for cache backend
          // prefix for stored languages
          prefix: 'i18next_res_',

          // expiration
          expirationTime: 7 * 24 * 60 * 60 * 1000,

          // Version applied to all languages, can be overriden using the option `versions`
          defaultVersion: '30.09.2022',

          // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
          store: window.localStorage,
        },
        {
          // options for http backend
        },
      ],
    },

    detection: {
      caches: ['localStorage'],
    },
  });

export default i18n;
