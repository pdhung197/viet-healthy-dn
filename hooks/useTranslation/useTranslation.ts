import {useContext} from "react";
import {TranslationContext} from "../../contexts/translationContext/translationContext";
import {getObjectWithKey} from "../../helpers/common";
import {FormatType} from "../../models/Trans";

export const useTranslation = (nameSpace?: string) => {
  const {
    lang: loadedLanguage,
    userLanguage,
    handleChangeUserLanguage,
  } = useContext(TranslationContext);

  const t = (transKey: string, format?: FormatType) => {
    const languageKey = `${nameSpace ? nameSpace + "." : ""}${transKey}`;

    return getObjectWithKey(loadedLanguage, languageKey, format) || languageKey;
  };

  const setLanguage = (nextLanguage: string) =>
    handleChangeUserLanguage(nextLanguage);

  const getLanguage = (): string => userLanguage;

  return {
    t,
    setLanguage,
    getLanguage,
  };
};
