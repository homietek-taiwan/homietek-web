import { fallbackLng } from './settings';

const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ja: () => import('../dictionaries/ja.json').then((module) => module.default),
  'zh-TW': () => import('../dictionaries/zh-TW.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale]?.() ?? dictionaries[fallbackLng]();
};
