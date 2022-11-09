// import AppCollapse from "@Components/app-collapse";

import { yupResolver } from "@hookform/resolvers/yup";
import { parseNumber } from "@utils";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { useFieldArray, useFormContext } from "react-hook-form";
// import { ItemValidation } from "../../../validation/Transactions/SalesOrders";
import PaymentSchedule from "./PaymentSchedule";
import toast from "react-hot-toast";
// import ScrapMaterialList from "./ScrapMaterials";

function ItemModal({ onComplete, onToggle, row, temp }) {
  const {
    Contracts,
    ContractType,
    Property,
    Party,
    Currency,
    PropertyType,
    Territory,
    PropertyAttr,
    PaymentTermTemplate,
    Lawyer,
    CurrencyExchange,
    tempData: { network },
    Offline,
  } = useSelector((state) => state);
  
  
  // const ItemMap = useSqliteData({
  //   name: "Item",
  //   isMap: true,
  //   modifyData: (data) => data.map((x) => ({ ...x, UOMs: JSON.parse(x.UOMs) })),
  // });
  
  const [modal, setModal] = useState(false);
  const methods = useForm();
  const {
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
    control,
    handleSubmit,
  } = methods;
  const {
    fields: fieldspaymentschedualinfo,
    append: appendpaymentschedualinfo,
    remove: removepaymentschedualinfo,
    replace: Replacepaymentschedualinfo,
  } = useFieldArray({
    control,
    name: "paymentschedualinfo",
  });
  
  const checkPortions = (arr) => {
    let sumOfPortions = arr.reduce((acc, obj) => +acc + +obj?.Portion, 0);
    return +sumOfPortions === 100;
  };
  
  const onSubmit = (values) => {
    console.log(values.paymentschedualinfo,'Values');
    console.log(checkPortions(values.paymentschedualinfo))
    
    if (checkPortions(values.paymentschedualinfo) == true) {
      onComplete({ ...values, index: row.options.index });
      toggle();
    } else {
      toast.error("Portion Sums must be 100");
    }
  };
  useEffect(() => {
    try {
      if (row != undefined) {
        setModal(true);
        console.log("AAAAA", JSON.parse(row.data.paymentschedualinfo));
        reset(
          {
            ...row.data,
            _write: true,
            paymentschedualinfo: JSON.parse(row.data.paymentschedualinfo),
          },
          { keepDefaultValues: true }
        );
      }
    } catch (e) {
      console.error("hacker_it error", e);
    }methods;
  }, [row]);
  const toggle = () => {
    if (onToggle) onToggle(!modal);
    setModal(!modal);
  };

  const dataOfRow = [
    {
      title: "Raw Material",
      content: <PaymentSchedule />,
    },
  ]; 
  
  return (
    <>
      <Modal isOpen={modal} size="lg">
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
            <ModalBody>
              <Row>
                <Col sm="12">
                  <hr />
                  <PaymentSchedule
                    {...{
                      fieldspaymentschedualinfo,
                      appendpaymentschedualinfo,
                      removepaymentschedualinfo,
                      Replacepaymentschedualinfo,
                    }}
                  />

                  {/* <AppCollapse data={dataOfRow} type="shadow" /> */}
                  <hr />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <input type="hidden" {...register("id")} />
              <input type="hidden" {...register("ItemID")} />
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
}

export default ItemModal;
