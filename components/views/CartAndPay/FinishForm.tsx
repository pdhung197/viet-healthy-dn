import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { VHHead } from "../../blocks/Head/VHHead";

export const FinishForm = () => {
  const { t } = useTranslation();
  const { query: { order } = {} } = useRouter();

  return (
    <>
      <VHHead title={t(`pageData.cart.steps.finish.title`)} />
      <div className="finished-form">
        <h3>{t("pageData.cart.finishedForm.finish")}</h3>
        <p>
          {t("pageData.cart.finishedForm.yourOrder")}: <span>#{order}</span>
        </p>
        <p>{t("pageData.cart.finishedForm.callback")}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: t("pageData.cart.finishedForm.phone"),
          }}
        />
      </div>
    </>
  );
};
