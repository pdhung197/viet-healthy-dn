import { vi } from './vi/index';
import { en } from './en/index';

export type Lang = {
  [key: string]: any;
};

export type LangOption = {
  [key: string]: string;
};

export const lang: Lang = {
  en,
  vi,
};

export const langOptions: LangOption = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export const fallBackLanguage = 'en';

export const defaultLanguage = 'en';
