// ** React Import
import React, { useContext, useEffect, useMemo, useState } from "react";
// ** Custom Components
// ** Utils
import { isObjEmpty, sendAttachment, toBoolean } from "@utils";

// ** Third Party Components
// import CustomImageInput from "@Component/Form/CustomImageInput";
import AttachmentComponent from "@Component/Attachment";
import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormInputCheckbox from "@Component/Form/CustomFormInputCheckbox";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import PrintDropDown from "@Component/PrintDropDown";
import { PartyTypeOptions } from "@FixedOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import Routes from "@Routes";
import { AbilityContext } from "@src/utility/context/Can";
import { insertItem, updateItem } from "@store/actions/data";
import { Contract as Schema } from "@validation";
import axios from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";
import Furnitures from "./Furnitures";
import ExtraPayment from "./ExtraPayment";
import Attribute from "./Attribute";
import getPrintDate from '@Print/getData/Contract';
import { isAsyncThunkAction } from "@reduxjs/toolkit";
const POST = (props) => {
  const { t } = useTranslation();
  const {
    Contracts,
    ContractType,
    Property,
    Party,
    Currency,
CurrencyExchange,
    tempData: { network },
    Offline,
  } = useSelector((state) => state);
console.log(CurrencyExchange);
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
  const Attachments = useSelector((state) => state.Attachment);
  const _dataForm = useWatch({ control });
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  // ** Function to handle form submit
  useEffect(() => {
    console.log("testing", errors);
  }, [errors]);
  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      values.PartyType = toBoolean(values.PartyType);
      setLoading(true);
      const identifier = network
        ? values.Series
        : values.ID

      dispatch(
        identifier
          ? updateItem("Contracts", values)
          : insertItem("Contracts", values)
      )
        .then((res) => {

          toast.success();
          console.log(Attachments);
          if (Attachments.length > 0) {
            sendAttachment({
              files: Attachments,
              refDoctype: "Data",
              refSeries: res?.Series,
            });
            console.log(Attachments)
            navigate("/Contract/Contract");
          } else {
            navigate("/Contract/Contract");
          }
        })
        .catch((err) => {
          console.log("hacker_it_err", err);
          toast.error(err.response.data.message)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  console.log("testing",network,params?.series)
  const _write = useMemo(
    () => toBoolean(ability.can("write", "DT-2")),
    [ability.can("write", "DT-2")]
  );
   useEffect(async () => {
     if (params?.series) {
       if (network) {
         const { data } =  await axios.get(`${Routes.Contracts.root}/${params.series}`)
         reset({
           ...data,
           _loading: false,
           _write,
         });
       } else {
         const _ = Offline.Contracts.find((x) => x.ID == params.series);
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
   }, [Contracts]);
  const _watchProperty = useWatch({ control, name: "Property" });
  const IsRent = useWatch({ control, name: "IsRent" });
  const IsSale = useWatch({ control, name: "IsSale" });
  let PayParty=[]
  Property.forEach((x) => {
    if (x.Series == _watchProperty) {
      Party.filter((y) => {
        if (y.Series == x.Party) {
          PayParty.push({ label: y.FullName, value: y.Series });
          console.log("TESTING",PayParty);
        }
      });
    }
  });

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
        <Row style={{ justifyContent: "end", marginBottom: "1rem" }}>
          <Col sm="2" className="d-flex justify-content-end align-items-center">
            <Button
              style={{ marginRight: "1rem" }}
              color="primary"
              type="submit"
              className="mr-1  "
              disabled={loading || (params.series && !_write)}
            >
              {loading && <Spinner color="white" size="sm" className="mr-1 " />}
              {t("Save")}
            </Button>
            {params.series && (
              <PrintDropDown
                Doctype={["DT-2"]}
                getDate={async () => await getPrintDate({ data: getValues() })}
              />
            )}
          </Col>
        </Row>

        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col sm="6">
                  <CustomFormSelect
                    options={Property}
                    valueName="Series"
                    textName="Series"
                    name="Property"
                  />
                  {/* Where BackEnd */}
                  <CustomFormSelect
                    name="ContractType"
                    textName="ContractType"
                    valueName="Series"
                    options={ContractType}
                  />

                  <CustomFormInput name="ContractStarts" type="Date" />
                </Col>
                <Col sm="6">
                  <Row>
                    {_watchProperty ? (
                      <CustomFormSelect name="FirstParty" options={PayParty} />
                    ) : (
                      <div>
                        <Alert className="p-1 mt-1" color="danger">
                          <center>
                            You Must Choose Property First To Choose First Party
                          </center>
                        </Alert>
                      </div>
                    )}

                    <CustomFormSelect
                      name="SecondParty"
                      textName="FullName"
                      valueName="Series"
                      options={Party}
                    />
                    <Col sm="6" style={{ marginTop: "2rem" }}>
                      <CustomFormInputCheckbox
                        name="IsFurnished"
                        IsDisabled={_dataForm.IsDefault}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Col sm="12">
            <hr />
            <Furnitures {...{ loading }} />
            <hr />
          </Col>
        </Row>
        <Row>
          <Col sm="8">
            <hr />
            <Attribute {...{ loading }} />
            <hr />
          </Col>
        </Row>

        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col sm="6">
                  <CustomFormInput name="ContractDate" type="Date" />
                  <CustomFormInput name="HandoverDate" type="Date" />
                  <CustomFormNumberInput name="PaidAmt" />
                </Col>
                <Col sm="6">
                  <CustomFormInput type="Date" name="ContractEnds" />
                  <CustomFormNumberInput name="RequestedAmt" />
                  <CustomFormSelect
                    name="PaidCurrency"
                    textName="CurrencyName"
                    valueName="Series"
                    options={Currency}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <CustomFormInput name="RentFor" />
                </Col>
                <Col sm="6">
                  <CustomFormSelect
                    name="RentCurrency"
                    textName="CurrencyName"
                    valueName="Series"
                    options={Currency}
                  />
                </Col>

                <Row>
                  <Col style={{ display: "flex", marginTop: "1rem" }}>
                    <CustomFormInputCheckbox
                      IsDisabled={IsRent}
                      name="IsSale"
                    />
                    <CustomFormInputCheckbox
                      IsDisabled={IsSale}
                      name="IsRent"
                    />
                  </Col>
                </Row>
              </Row>
              <Row className="mt-1"></Row>
            </CardBody>
          </Card>
        </Row>
        {/* Third */}
        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col sm="6">
                  <CustomFormNumberInput name="AdvanceAmt" />
                  <CustomFormInput name="Lawyer" />
                  <CustomFormSelect
                    name="AdvanceCurrency"
                    textName="CurrencyName"
                    valueName="Series"
                    options={Currency}
                  />
                </Col>
                <Col sm="6">
                  <CustomFormInput type="number" name="InsuranceAmt" />
                  <CustomFormSelect
                    name="InsuranceCurrency"
                    textName="CurrencyName"
                    valueName="Series"
                    options={Currency}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col sm="7">
                  <ExtraPayment {...{ loading }} />
                </Col>
                <Col>
                  {/* Table Go Here */}
                  <CustomFormInput name="Remarks" type="textarea" />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <Button
          className="ml-1"
          color="primary"
          onClick={() => setIsAttachmentModalOpen(true)}
        >
          Attachment
        </Button>

        <AttachmentComponent
          isModalOpen={isAttachmentModalOpen}
          handleToggleModel={setIsAttachmentModalOpen}
          series={params?.series}
          refDoctype="Data"
        />
      </Form>
    </FormProvider>
  );
};

export default POST;
