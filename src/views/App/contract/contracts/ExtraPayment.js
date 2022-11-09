// Joseph : Look at findRate functino please

import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import CustomFormInput from "@Component/Form/CustomFormInput";
import { sleep, toBoolean } from "@utils";
import { useEffect, useRef } from "react";
import React from "react";
import { Info, Plus, Trash2 } from "react-feather";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from "reactstrap";
import { Button, Col, Row, Table } from "reactstrap";
import PaymentSchedule from "./PaymentSchedule";
import { useParams } from "react-router-dom";
import { addDays, addMonths } from "../../../../utility/Utils";
const RefsList = ({ onEdit }) => {
  const { t } = useTranslation();
  const ref = useRef();
  const {
    control,
    register,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ExtraPayment",
  });
  const { PaymentTypes, Currency, Party, PaymentTermTemplate } = useSelector(
    (state) => state
  );
  const [modal, setModal] = React.useState(false);
  // Toggle for Modal
  const toggle = () => setModal(!modal);
  const findPaymentTermTemplate = (index) => {
    let _ = PaymentTermTemplate.find(
      (x) => x.Series == getValues(`ExtraPayment.${index}.PaymentTermTemplate`)
    );

    const Amount = getValues(`ExtraPayment.${index}.Amount`);
    const paymentSchedularInfo = JSON.parse(_?.PaymentTermInfo).map((x) => ({
      ...x,
      //TODO: Add Start Contract
      Amount: Amount * (x.Portion / 100),
      DueDate: x.BasedOn
        ? [addDays(new Date(), +x.CreditDays)]
        : [addMonths(new Date(), +x.CreditDays)],
    }));
    
    setValue(
      `ExtraPayment.${index}.paymentschedualinfo`,
      JSON.stringify(paymentSchedularInfo)
    );
  };
  
  const refreshPaymentTermTemplate = (index) => {
    const Amount = getValues(`ExtraPayment.${index}.Amount`);
    const _paymentschedualinfo = getValues(
      `ExtraPayment.${index}.paymentschedualinfo`
    );
    const paymentSchedularInfo = JSON.parse(_paymentschedualinfo).map((x) => ({
      ...x,
      Amount: Amount * (x.Portion / 100),
      DueDate: x.BasedOn
        ? [addDays(new Date(), x.CreditDays)]
        : [addMonths(new Date(), x.CreditDays)],
    }));
    setValue(
      `ExtraPayment.${index}.paymentschedualinfo`,
      JSON.stringify(paymentSchedularInfo)
    );
  };

  const PaymentTermTemplateChange = (index) => {
    findPaymentTermTemplate(index);
  };
  const AmountChange = (index) => {
    refreshPaymentTermTemplate(index);
  };
  // useEffect(()=>{
  //   PaymentTermTemplateChange()
  // })
  return (
    <>
      <h5 className="">{t("ExtraPayment")}</h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: "13%", marginLeft: "10px" }}>{t("#")}</th>
              <th style={{ width: "25%" }}>{t("PaymentTermTemplate")}</th>
              <th style={{ width: "25%" }}>{t("PaymentType")}</th>
              <th style={{ width: "25%" }}>{t("FromParty")}</th>
              <th style={{ width: "25%" }}>{t("ToParty")}</th>
              <th style={{ width: "25%" }}>{t("Amount")}</th>
              <th style={{ width: "25%" }}>{t("PaidCurrency")}</th>
            </tr>
          </thead>
          <tbody {...{ ref }}>
            {fields.map((x, index) => {
              return (
                <div key={x.id}>
                  <tr className="d-flex">
                    <th style={{ width: "5%" }} scope="row">
                      {index + 1}
                    </th>
                    <td style={{ width: "18%" }}>
                      <CustomFormSelect
                        extraOnChangeFun={() =>
                          PaymentTermTemplateChange(index)
                        }
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        textName="PaymentTerm"
                        valueName="Series"
                        options={PaymentTermTemplate}
                        name={`ExtraPayment.${index}.PaymentTermTemplate`}
                      />
                    </td>
                    <td style={{ width: "18%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        textName="PaymentType"
                        valueName="Series"
                        options={PaymentTypes}
                        name={`ExtraPayment.${index}.PaymentType`}
                      />
                    </td>
                    <td style={{ width: "18%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        name={`ExtraPayment.${index}.FromParty`}
                        options={Party}
                        valueName="Series"
                        textName="FullName"
                      />
                    </td>
                    <td style={{ width: "18%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        name={`ExtraPayment.${index}.ToParty`}
                        options={Party}
                        valueName="Series"
                        textName="FullName"
                      />
                    </td>
                    <td style={{ width: "18%" }}>
                      <CustomFormInput
                        name={`ExtraPayment.${index}.Amount`}
                        hiddenTitle
                        extraOnChangeFun={() => AmountChange(index)}
                      />
                    </td>
                    <td style={{ width: "18%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        options={Currency}
                        valueName="Series"
                        textName="CurrencyName"
                        name={`ExtraPayment.${index}.PaidCurrency`}
                      />
                    </td>
                    {/* <td>
                      <Button onClick={toggle} />
                      <Form >
                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalBody>
                            <PaymentSchedule
                              {...{
                                loading,
                                index,
                                fieldspaymentschedualinfo,
                                appendpaymentschedualinfo,
                                removepaymentschedualinfo,
                                Replacepaymentschedualinfo,
                              }}
                            />
                          </ModalBody>
                        </Modal>
                      </Form>
                    </td> */}
                    <td style={{ width: "10%" }}>
                      <Button.Ripple
                        className="btn-icon"
                        color="flat-primary"
                        onClick={() => onEdit(index)}
                      >
                        <Info size="15" />
                      </Button.Ripple>
                      <Button.Ripple
                        className="btn-icon"
                        color="flat-danger"
                        onClick={async () => {
                          await Promise.all([remove(index)]);
                        }}
                      >
                        <Trash2 size="15" />
                      </Button.Ripple>
                    </td>
                  </tr>
                  <input
                    className="d-none"
                    defaultValue={x.id ?? ""}
                    {...register(`ExtraPayment.${index}.id`)}
                  />
                  <input
                    className="d-none"
                    {...register(`ExtraPayment.${index}.paymentschedualinfo`)}
                  />
                </div>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Row>
        <Col>
          <small className="my-1 text-danger d-block">
            <ul>
              {Array.isArray(errors[`priceListCountries`]) &&
                errors[`priceListCountries`].map((x, i) =>
                  Object.keys(x)?.map((e) => <li> </li>)
                )}
            </ul>
          </small>
          {toBoolean(getValues("_write")) && (
            <Button
              className="btn-icon"
              color="success"
              onClick={() => {
                append({});
                // wait until add the row then scroll to down
                // sleep(100).then(
                //   () => (ref.current.scrollTop = ref.current.scrollHeight)
                // );
              }}
            >
              <Plus size={14} />
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default RefsList;
