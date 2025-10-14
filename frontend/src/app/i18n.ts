import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import fs from 'fs';
import path from 'path';

const locales = ['en', 'es'];
const namespaces = ['common', 'contact-form', 'header', 'trust-badges', 'icon-gallery'];

interface Resources {
  [key: string]: {
    [key: string]: { [key: string]: string };
  };
}

const resources = locales.reduce((acc: Resources, lng) => {
  acc[lng] = namespaces.reduce((nsAcc: { [key: string]: { [key: string]: string } }, ns) => {
    const filePath = path.resolve(process.cwd(), `public/locales/${lng}/${ns}.json`);
    if (fs.existsSync(filePath)) {
      nsAcc[ns] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return nsAcc;
  }, {});
  return acc;
}, {});

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    resources: typeof window === 'undefined' ? resources : undefined,
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: namespaces,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;