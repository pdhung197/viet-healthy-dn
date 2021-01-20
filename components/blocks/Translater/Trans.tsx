import {useContext} from "react";
import {TranslationContext} from "../../../contexts/translationContext/translationContext";
import {getObjectWithKey} from "../../../helpers/common";
import {TransProps} from "../../../models/Trans";

export const Trans = ({
  t: transKey,
  format,
  components: RenderingComponent,
}: TransProps) => {
  const {lang: loadedLanguage} = useContext(TranslationContext);

  const transContent =
    getObjectWithKey(loadedLanguage, transKey, format) || transKey;

  if (!RenderingComponent) return transContent;

  return <RenderingComponent>{transContent}</RenderingComponent>;
};
