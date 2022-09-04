// ** React Import
import React, { useContext, useEffect, useMemo, useState } from "react";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
// ** Utils
import { isObjEmpty, toBoolean } from "@utils";
// ** Third Party Components
import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormInputCheckbox from "@Component/Form/CustomFormInputCheckbox";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { PartyTypeOptions } from "@FixedOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import Routes from "@Routes";
import { AbilityContext } from "@src/utility/context/Can";
import { insertItem, updateItem } from "@store/actions/data";

import { Contract_Payment as Schema } from "@validation";
import axios from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";
import toast from "react-hot-toast";
// import { confirmAlert2 } from '../../../utility/alert';
const POST = (props) => {
  const { t } = useTranslation();
  const {
    Payments,
    Property,
    Purpose,
    Currency,
    Contracts,
    Party,
    Offline,
    
    tempData: { network },
  } = useSelector((state) => state);
  console.log(Offline)
  const ability = useContext(AbilityContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const methods = useForm({
    defaultValues: { _loading: true },
    resolver: yupResolver(Schema),
  });
  const {
    register,
    reset,
    getValues,
    formState: { errors },
    control,
    handleSubmit,
  } = methods;
  const _dataForm = useWatch({ control });
  // ** Function to handle form submit
useEffect(()=>{
console.log(errors);
},[errors])
  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      values.PartyType = toBoolean(values.PartyType);
      setLoading(true);
      const idenfier = network ? values.Series : values.ID;

      dispatch(
        idenfier
          ? updateItem("Payments", values)
          : insertItem("Payments", values)
      )
        .then((res) => {
          toast.success();
          navigate("/App/Contract/Payment");
        })
        .catch((err) => {
          console.log("hacker_it_err", err);
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const _write = useMemo(
    () => toBoolean(ability.can("write", "DT-6")),
    [ability.can("write", "DT-6")]
  );
  useEffect(async () => {
    if (params.series) {
      if (!Payments.length) return;
      if (network) {
        const { data } = network
          ? await axios.get(`${Routes.Payments.root}/${params.series}`)
          : _;
        reset({
          ...data,
          _loading: false,
          _write,
        });
      } else {
        const _ = Offline.Payments.find((x) => x.ID == params.series);
        console.log(_);
        reset({
          ..._,
          _loading: false,
          _write,
        });
      }
    } else
      reset({
        _write: true,
        _loading: false,
      });
  }, [Payments]);
  let PropOpt = [];
  Property.forEach((x) => {
    PropOpt.push({ value: x.Series, label: x.Series + " " + x.Attributes });
  });
  let PurpOpt = [];
  Purpose.forEach((x) => {
    PurpOpt.push({ value: x.Series, label: x.Series + " " + x.Purpose });
  });
  let CurrencyOpt = [];
  Currency.forEach((x) => {
    CurrencyOpt.push({
      value: x.Series,
      label: x.Series + " " + x.CurrencyName,
    });
  });
  let ContractOpt = [];
  Contracts.forEach((x) => {
    ContractOpt.push({
      value: x.Series,
      label: x.Series,
    });
  });
  let PartyOpt = [];

  const _watchChooseTheTable = useWatch({ control, name: "Reference" });
const _ = Contracts?.filter((x) => x.Series === _watchChooseTheTable).map((x) =>
  PartyOpt.push(
    { label: x.FirstParty, value: x.FirstParty },
    { label: x.SecondParty, value: x.SecondParty }
  )
);
                    console.log(_)
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
        <Row>
          <Col sm="0" className="d-flex justify-content-end align-items-center">
            <Button
              color="primary "
              type="submit"
              className="mr-1 mb-2"
              disabled={loading || (params.series && !_write)}
            >
              {loading && <Spinner color="white" size="sm" className="mr-1" />}
              {t("Save")}
            </Button>
          </Col>
        </Row>
        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col sm="6">
                  <CustomFormSelect name="PayParty" options={PartyOpt} />
                  <CustomFormSelect name="ReceiveParty" options={PartyOpt} />
                  <CustomFormInput
                    name="PostingDate"
                    textName="Currency"
                    type="Date"
                    valueName="Series"
                  />
                </Col>
                <Col sm="6">
                  <CustomFormSelect name="Reference" options={ContractOpt} />
                  <CustomFormSelect name="Currency" options={CurrencyOpt} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        {/* Second */}

        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col sm="6">
                  <CustomFormSelect name="Purpose" options={PurpOpt} />
                </Col>
                <Col sm="6">
                  <CustomFormInput name="Amount" />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        {/* Third */}
        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <CustomFormInput name="For" type="textarea"></CustomFormInput>{" "}
                </Col>
                <Col>
                  {/* Table Go Here */}
                  <CustomFormInput name="Remarks" type="textarea" />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </Form>
    </FormProvider>
  );
};
export default POST;
