import Avatar from '@components/avatar';
import { Fragment } from 'react';
import { Info } from 'react-feather';
import { useTranslation } from 'react-i18next';

export const InfoToast = ({ msg = '' }) => {
  const {t}=useTranslation()
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="info" icon={<Info size={12} />} />
          <h6 className="mb-0 text-info ml-50">{t("Info")}</h6>
        </div>
        <small className="text-muted">{t("1 Min Ago")}</small>
      </div>
      <div className="toastify-body">
        <span>{t(msg ?? "info")}</span>
      </div>
    </Fragment>
  );
};
