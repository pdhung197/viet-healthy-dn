import dayjs from "dayjs";
import {FormatType} from "../models/Trans";

const regexGetTextsBetweenDoubleBracket = /\{(.*?\}*)\}/g;
const regexGetFirstTextBetweenBracket = /\{(.*?\}*)\}/;

const resultFormatting = (result: any, option: string): any => {
  try {
    if (!option || !option.length) return result;

    if (option === "uppercase") return (result as string).toUpperCase();

    if (option === "lowercase") return (result as string).toLowerCase();

    if (Date.parse(result)) return dayjs(result, option); // format(new Date(result), option) || '';

    return result;
  } catch (error) {
    console.log({error});
    return "";
  }
};

export const getResultFormatted = (
  text: string,
  resultFormat: FormatType
): string => {
  const textSplit = (text.split(regexGetTextsBetweenDoubleBracket) || []).map(
    (tx: string) => {
      const textMatch = tx.match(regexGetFirstTextBetweenBracket);
      if (!textMatch) return tx;
      const [key, option] = textMatch[1]
        .split(",")
        .map((keyOrOption) => keyOrOption.trim());

      return resultFormatting(resultFormat[key], option) || "";
    }
  );

  return textSplit.join("");
};

export const getObjectWithKey = (
  object: any,
  key: string,
  resultFormat?: FormatType
): any => {
  if (!(object instanceof Object)) return null;
  if (!Object.keys(object).length) return null;
  const keys = key.split(".");

  const result =
    keys.length - 1
      ? getObjectWithKey(object[keys[0]], keys.slice(1).join("."))
      : object[key];
  if (resultFormat && typeof result === "string")
    return getResultFormatted(result, resultFormat);
  return result;
};

export const removeLatinCharAndSpecialChar = (str: string) =>
  str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9]/gi, "")
    .toLowerCase();

export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
