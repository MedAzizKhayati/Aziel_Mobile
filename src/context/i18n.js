import i18next from 'i18next';
import english from './english.json';
import french from './french.json';
import {initReactI18next} from 'react-i18next';

i18next.use(initReactI18next).init({
    lng:'en',
    ressources:{
        en:english,
        fr:french
    },
    react: {
        useSuspense:false,
    },
})
export default i18next;