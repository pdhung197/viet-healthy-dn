import {createContext} from "react";
import {defaultLanguage, lang} from "./../../localize/translation/lang";

export const TranslationContext = createContext({
  userLanguage: defaultLanguage,
  lang: lang[defaultLanguage],
  handleChangeUserLanguage: (selectedLanguage: string) => {
    console.log({selectedLanguage});
  },
});
