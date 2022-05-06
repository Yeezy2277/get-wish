import i18n from "i18next";
import {initReactI18next, useTranslation} from "react-i18next";

export const translations = {
    en: require('../assets/i18n/en.json'),
    ru: require('../assets/i18n/ru.json'),
}

const defaultNS = 'translation';

i18n.use(initReactI18next)
    .init({
        defaultNS,
        resources: translations,
        fallbackLng: 'en',
        debug: __DEV__,
        interpolation: {
            escapeValue: false,
        },
    })
    .catch((err) => console.error('Initialization i18n failed', err));

export const useI18n = () => {
    const { t } = useTranslation(defaultNS);
    return t;
}

export const withI18n = (Component) => {
    return (props) => {
        const t = useI18n()
        return (<Component {...props} t={t}/>)
    }
}
