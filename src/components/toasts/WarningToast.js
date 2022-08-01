import Avatar from '@components/avatar';
import { Fragment } from 'react';
import { AlertTriangle } from 'react-feather';
import { useTranslation } from 'react-i18next';

export const WarningToast = ({ msg = '' }) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar
            size="sm"
            color="warning"
            icon={<AlertTriangle size={12} />}
          />
          <h6 className="text-warning ml-50 mb-0">{t("Warning!")}</h6>
        </div>
        <small className="text-muted">{t("1 Min Ago")}</small>
      </div>
      <div className="toastify-body">
        <span>{t(msg ?? "warning")}</span>
      </div>
    </Fragment>
  );
};
