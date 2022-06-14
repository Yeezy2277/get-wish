import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

export const translations = {
  en: require('../assets/i18n/en.json'),
  ru: require('../assets/i18n/ru.json'),
};

const defaultNS = 'translation';
const fallbackLang = 'ru';

/**
 * Возвращает текущую локаль устройства
 * @return {string} - Локаль в виде строки ('en', 'ru', ..)
 */
export const getLocale = () => {
  let locale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
  return typeof locale === 'string' && locale.length >= 2
    ? locale.slice(0, 2).toLowerCase()
    : fallbackLang;
};

i18n.use(initReactI18next)
  .use({
    init: Function.prototype,
    type: 'languageDetector',
    detect: getLocale,
    cacheUserLanguage: Function.prototype,
  })
  .init({
    defaultNS,
    resources: translations,
    fallbackLng: fallbackLang,
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err) => console.error('Initialization i18n failed', err));

/**
 * Хук для получения ссылки на i18n
 * в функциональные компоненты
 */
export const useI18n = () => {
  const { t } = useTranslation(defaultNS);
  return t;
};

/**
 * HOC для инъекции ссылки на i18n
 * в свойства компонента
 * @param Component - компонент, в который требуется
 *      предоставить ссылку на i18n (имя свойства: t)
 */
export const withI18n = (Component) => {
  return function (props) {
    const t = useI18n();
    return (<Component {...props} t={t} />);
  };
};
