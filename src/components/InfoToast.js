import Avatar from "@components/avatar";
import { Fragment } from "react";
import { Info } from "react-feather";
export const InfoToast = ({ msg = "info" }) => {
    const { t } = useTranslation()
    return (
        <Fragment>
            <div className="toastify-header">
                <div className="title-wrapper">
                    <Avatar size="sm" color="info" icon={<Info size={12} />} />
                    <h6 className="toast-title">Info!</h6>
                </div>
                <small className="text-muted">1 Min Ago</small>
            </div>
            <div className="toastify-body">
                <span role="img" aria-label="toast-text">
                    {t(msg)}
                </span>
            </div>
        </Fragment>
    )
};
