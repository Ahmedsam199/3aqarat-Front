import { t } from 'i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Col, FormGroup, Input, Label, Modal, ModalBody,
  ModalFooter, ModalHeader
} from 'reactstrap';
import CustomSelect from '../../../../components/CustomSelect';
const initState = {
  printName: "",
  doctype: "",
  isRtl: false,
  isReceipt: false,
}
const PrintModal = ({ open, onModalClose }) => {
  const { DocType } = useSelector((state) => state);
  const [values, setValues] = useState(initState);
  const handleChange = (key, value) => {
    setValues((prev) => {
      return { ...prev, [key]: value };
    });
  };
  return (
    <Modal
      isOpen={open}
      toggle={() => {
        onModalClose(!open);
        setValues(initState);
      }}
      centered={true}
    >
      <ModalHeader>{t("New Contract Template")}</ModalHeader>
      <ModalBody>
        <Col>
          <FormGroup>
            <Label>{t("Print Name")} :</Label>
            <Input
              placeholder="print Name"
              value={values.printName}
              onChange={(e) => {
                handleChange("printName", e.target.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>{t("Doctype")} :</Label>
            <CustomSelect
              options={DocType}
              textName="DocType"
              valueName="series"
              value={values.doctype}
              onChange={async (e) => {
                handleChange("doctype", e.value);
              }}
            />
          </FormGroup>
        </Col>
        <Col>
          <Label>
            <Input
              id="isRTL"
              type="checkbox"
              checked={values.isRtl}
              onChange={(e) => handleChange("isRTL", e.target.checked)}
            />
            {t("isRTL")}
          </Label>
        </Col>
        <Col>
          <Label>
            <Input
              id="isReceipt"
              type="checkbox"
              checked={values.isReceipt}
              onChange={(e) => handleChange("isReceipt", e.target.checked)}
            />
            {t("isReceipt")}
          </Label>
        </Col>
      </ModalBody>
      <ModalFooter>
        <Link
          to={`/Setting/NewPrintCustomization/${values.printName}/${values.doctype}/${values.isRtl}/${values.isReceipt}`}
        >
          <Button
            color="primary"
            disabled={!values.doctype || !values.printName}
          >
            {t("Next")}
          </Button>
        </Link>
      </ModalFooter>
    </Modal>
  );
};

export default PrintModal;
