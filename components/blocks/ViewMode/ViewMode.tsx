import React from "react";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { ViewModes } from "../../../models/Common";

type ViewModeProps = {
  mode: ViewModes;
  onChangeMode: (newMode: ViewModes) => void;
};

export const ViewModeBtn = ({ mode, onChangeMode }: ViewModeProps) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() =>
        onChangeMode(mode === ViewModes.grid ? ViewModes.list : ViewModes.grid)
      }
    >
      {t("pageData.product.showMode")}{" "}
      {t(
        `pageData.product.viewMode.${
          mode === ViewModes.grid ? ViewModes.list : ViewModes.grid
        }`
      )}
    </button>
  );
};
