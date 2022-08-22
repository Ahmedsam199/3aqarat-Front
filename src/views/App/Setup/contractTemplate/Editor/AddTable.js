import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, memo, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Form, Modal, ModalBody, Row } from "reactstrap";
import * as yup from "yup";
import CustomFormSelect from "../../../../../components/Form/CustomFormSelect";
import Mentions from "./mention.json";
import Select from "react-select";
import { Label } from "reactstrap";
import { useState } from "react";
const AddTable = ({
  modal,
  toggle,
  setTableData,
  AddT,
  setSelectedAttr,
  
}) => {
  const { t } = useTranslation();
  const schema = yup.object().shape({});
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
    control,
    handleSubmit,
  } = methods;
  const ref = useRef();
  
  const onSubmit = (values) => {
    AddT();
    if (1) {
      toggle();
    }
  };
  useEffect(() => {
    if (modal) {
      reset({
        _write: true,
      });
    }
  }, [modal]);

  const _watchChooseTheTable = useWatch({ control, name: "ChooseTheTable" });
  
  const Options = [
    { label: "Attribute", value: "Attribute" },
    { label: "Furniture", value: "Furniture" },
    { label: "ExtraPayment", value: "ExtraPayment" },
  ];
  let Values_Contract2 = [];
  let Values_Contract = [];
  const AddTableRows = (e) => {
    e.forEach((x) => {
      if (x == ",") {
      } else {
        Values_Contract.push(x);
        Values_Contract2.push(x.label);
      }
    });
    let uniqueChars = [...new Set(Values_Contract)];

    setAny(uniqueChars);
    const tableRows = uniqueChars.map((info) => {
      return `<td data-name='@${info.value}'>${info.value}</td>`;
    });
    setSelectedAttr(_watchChooseTheTable);
    let table = `<table id='${_watchChooseTheTable}'><tr>${tableRows}</tr></table>`;
    for (let i = 0; i < tableRows.length; i++) {
      let newStr = table.replaceAll(",", "");
      setTableData(newStr);
    }
  };
  const dummy = {
    Properties: [
      { Property: "AA", Attribute: "11", Owner: "ME", Territory: "LOL" },
      { Property: "BB", Attribute: "22", Owner: "you", Territory: "Nul" },
      { Property: "CC", Attribute: "33", Owner: "Him", Territory: "Mul" },
    ],
    Contract: [
      { Contract: "AA", Payment: "200" },
      { Contract: "B", Payment: "444" },
    ],
  };
  const [any, setAny] = useState([]);

  return (
    <Modal isOpen={modal} centered size="lg">
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <CustomFormSelect options={Options} name="ChooseTheTable" />
            <Label>Choose The Attribute</Label>
            <Select
              className={"react-select"}
              classNamePrefix="select"
              options={Mentions[_watchChooseTheTable]}
              isMulti={true}
              onChange={(e) => AddTableRows(e.valueOf(e.target))}
              />
              
            <Row>
              <Col
                sm={{ size: 4, offset: 4 }}
                className="d-flex justify-content-between"
              >
                <Button type="submit" color="primary">
                  {t("Save")}
                </Button>
                <Button onClick={toggle} color="danger">
                  {t("Cancel")}
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Form>
      </FormProvider>
    </Modal>
  );
};

export default memo(AddTable);
