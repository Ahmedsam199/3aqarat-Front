import Avatar from '@components/avatar';
import { Fragment } from 'react';
import { XCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';

export const ErrorToast = ({ msg, values }) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="danger" icon={<XCircle size={12} />} />
          <h6 className="toast-title">{t("Error!")}</h6>
        </div>
        <small className="text-muted">{t("1 Min Ago")}</small>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          {t(msg ?? "Error", values)}
        </span>
      </div>
    </Fragment>
  );
};
