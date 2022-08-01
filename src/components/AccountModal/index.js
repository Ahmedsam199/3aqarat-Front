import { useTranslation } from 'react-i18next';
import {
    Modal, ModalBody,
    ModalHeader
} from 'reactstrap';
import InfoForm from './Form';
import License from './License';
import RenewSubscription from './RenewSubscription';
const AccountModal = ({ open, onModalClose }) => {
    const { t } = useTranslation()
    const close = () => {
        if (onModalClose) onModalClose();
    };
    return (
        <Modal isOpen={open} toggle={close} >
            <ModalHeader toggle={close}>
                {t("Account")}
            </ModalHeader>
            <ModalBody>
                <License />
                <RenewSubscription />
                <InfoForm {...{ close }} />
            </ModalBody>

        </Modal>
    )
};


export default AccountModal;
