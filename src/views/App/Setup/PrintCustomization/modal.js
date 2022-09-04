import CustomSelect from '@Component/CustomSelect';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Col, FormGroup, Input, Label, Modal, ModalBody,
  ModalFooter, ModalHeader
} from 'reactstrap';
const PrintModal = ({ open, onModalClose }) => {
  const { t } = useTranslation()
  const [printName, setPrintName] = useState('');
  const { DocType } = useSelector(state => state)
  const [doctype, setdoctype] = useState('');
  const [isRtl, setisRtl] = useState(false);
  const [isLandscape, setisLandscape] = useState(false);
  return (
    <Modal isOpen={open} toggle={() => onModalClose(!open)} centered={true}>
      <ModalHeader>
        {t("New Print Customization")}
      </ModalHeader>
      <ModalBody>
        <Col>
          <FormGroup>
            <Label>
              {t("Print Name")}:
            </Label>
            <Input
              placeholder="print Name"
              value={printName}
              onChange={(e) => {
                console.log(e);
                setPrintName(e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>
              {t("Doctype")}:
            </Label>
            <CustomSelect
              textName="DocType"
              valueName="series"
              value={doctype}
              onChange={async (e) => {
                setdoctype(e.value);
              }}
              options={DocType}
            />
          </FormGroup>
        </Col>
        <Col>
          <Label>
            <Input
              id="isRTL"
              type="checkbox"
              checked={isRtl}
              onChange={(e) => setisRtl(e.target.checked)}
              style={{ marginRight: "1rem" }}
            />
            {t("isRTL")}
          </Label>
        </Col>

        <Col>
          <Label>
            <Input
              id="isLandscape"
              type="checkbox"
              checked={isLandscape}
              onChange={(e) => setisLandscape(e.target.checked)}
              style={{ marginRight: "1rem" }}
            />
            {t("isLandscape")}
          </Label>
        </Col>
      </ModalBody>
      <ModalFooter>
        <Link
          to={`/Setup/NewPrintCustomization/${printName}/${doctype}/${isRtl}/${isLandscape}`}
        >
          {(doctype !== undefined &&
            doctype !== '' &&
            printName !== undefined &&
            printName !== '' && (
              <Button color="primary">
                {t("Next")}
              </Button>
            )) || (
              <Button color="primary" disabled>
                {t("Next")}
              </Button>
            )}
        </Link>
      </ModalFooter>
    </Modal>
  );
};

export default PrintModal;
