// ** React Import
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Currency } from "@FixedOptions";
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
import { toast } from "react-toastify";
import { Contract_Payment as Schema } from "@validation";
import axios from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";

// import { confirmAlert2 } from '../../../utility/alert';
const POST = (props) => {
  const { t } = useTranslation();
  const { Contract_Payment, Property_Property, Setup_Purpose } = useSelector(
    (state) => state
  );
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

  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      values.PartyType = toBoolean(values.PartyType);
      setLoading(true);
      dispatch(
        values.Series
          ? updateItem("Contract_Payment", values)
          : insertItem("Contract_Payment", values)
      )
        .then((res) => {
          toasty({ type: "success" });
          navigate("/App/Contract/Payment");
        })
        .catch((err) => {
          console.log("hacker_it_err", err);
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
      if (!Contract_Payment.length) return;
      // const _ = Party.find((x) => x.Series === params.series);
      const { data } = await axios.get(
        `${Routes.Contract_Payment.root}/${params.series}`
      );

      
      reset({
        ...data,
        // IsDefault: `${_.IsDefault}`,
        // Disabled: `${_.Disabled}`,
        
        _loading: false,
        _write,
      });
    } else
      reset({
        _write: true,
        _loading: false,
      });
  }, [Contract_Payment]);
  let PropOpt = [];
  Property_Property.forEach((x) => {
    PropOpt.push({ value: x.Series, label: x.Series + " " + x.Attributes });
  });
  let PurpOpt = [];
  Setup_Purpose.forEach((x) => {
    PurpOpt.push({ value: x.Series, label: x.Series + " " + x.Purpose });
  });
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
                  <CustomFormSelect
                    name="PayParty"
                    options={PartyTypeOptions}
                  />
                  <CustomFormSelect
                    name="ReciveParty"
                    options={PartyTypeOptions}
                  />
                  <CustomFormInput
                    name="PostingDate"
                    textName="Currency"
                    type="Date"
                    valueName="Series"
                  />
                </Col>
                <Col sm="6">
                  <CustomFormSelect
                    name="Reference"
                    textName="Currency"
                    valueName="Series"
                  />
                  <CustomFormSelect name="Property" options={PropOpt} />
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
                  <CustomFormSelect name="Pourpose" options={PurpOpt} />
                  <CustomFormInput name="FromDate" type="Date" />
                  <CustomFormSelect
                    name="PaidCurrency"
                    options={Currency}
                  />
                </Col>
                <Col sm="6">
                  <CustomFormInput name="PaidAmount" />
                  <CustomFormInput
                    type="Date"
                    name="ToDate"
                    textName="Currency"
                    valueName="Series"
                  />
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
                  <CustomFormInput name="Remark" type="textarea" />
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
