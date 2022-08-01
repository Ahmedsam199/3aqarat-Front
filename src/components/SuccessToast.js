import Avatar from "@components/avatar";
import { Fragment } from "react";
import { Check } from "react-feather";
import { useTranslation } from "react-i18next";
export const SuccessToast = ({ msg = "Save Successfully!" }) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="success" icon={<Check size={12} />} />
          <h6 className="toast-title">{t("Success!")}</h6>
        </div>
        <small className="text-muted">{t("1 Min Ago")}</small>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          {t(msg)}
        </span>
      </div>
    </Fragment>
  )
};
