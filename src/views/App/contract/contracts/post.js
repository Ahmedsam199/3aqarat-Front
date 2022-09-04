// ** React Import
import React, { useContext, useEffect, useMemo, useState } from "react";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
// ** Utils
import { isObjEmpty, toBoolean, sendAttachment } from "@utils";

// ** Third Party Components
// import CustomImageInput from "@Component/Form/CustomImageInput";
import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormInputCheckbox from "@Component/Form/CustomFormInputCheckbox";
import CustomFormRadioInput from "@Component/Form/CustomFormRadioInput";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { PartyTypeOptions } from "@FixedOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import Routes from "@Routes";
import { AbilityContext } from "@src/utility/context/Can";
import { insertItem, updateItem } from "@store/actions/data";
import { toasty } from "@toast";
import { Contract as Schema } from "@validation";
import axios from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";
import ReferenceList from "./ReferenceList";
import Ref2 from "./Ref2";
import AttachmentComponent from "@Component/Attachment";
import Ref3 from "./Ref3";
import toast from "react-hot-toast";
// register lottie and define custom element

// import { confirmAlert2 } from '../../../utility/alert';
const POST = (props) => {
  const { t } = useTranslation();
  const {
    Contracts,
    ContractType,
    Property,
    Party,
    Currency,
    
    tempData: { network },
    Offline,
  } = useSelector((state) => state);
  
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
      const idenfier=        network
          ? values.Series
          : values.ID

      dispatch(
        idenfier
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
          navigate("/App/Contract/Contract");
        }else{
          navigate("/App/Contract/Contract");
        }})
        .catch((err) => {
          console.log("hacker_it_err", err);
          toast.error(err.response.data.message)
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
      if (!Contracts.length) return;
      if (network) {
        const { data } = network
          ? await axios.get(`${Routes.Contracts.root}/${params.series}`)
          : _;
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
  let TypeOpt = [];
  ContractType.forEach((x) => {
    TypeOpt.push({ value: x.Series, label: x.Series + " " + x.ContractType });
  });
  let PropOpt = [];
  Property.forEach((x) => {
    PropOpt.push({ value: x.Series, label: x.Series + " " + x.Attributes });
  });
  let PartyOpt = [];
  Party.forEach((x) => {
    PartyOpt.push({ value: x.Series, label: x.Series + " " + x.FullName });
  });
  let CurrencyOpt = [];
  Currency.forEach((x) => {
    CurrencyOpt.push({
      value: x.Series,
      label: x.Series + " " + x.CurrencyName,
    });
  });

  const _watchChooseTheTable = useWatch({ control, name: "Property" });

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
        <Row>
          <Col sm="10"></Col>
          <Col sm="2" className="d-flex justify-content-end align-items-center">
            <Button
              color="primary"
              type="submit"
              className="mr-1 mb-2 "
              disabled={loading || (params.series && !_write)}
            >
              {loading && <Spinner color="white" size="sm" className="mr-1 " />}
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
                    name="FirstParty"
                    options={Property?.filter(
                      (x) => x.Series === _watchChooseTheTable
                    ).map((x) => ({ label: x.Party, value: x.Party }))}
                  />
                  <CustomFormSelect name="SecondParty" options={PartyOpt} />
                  <CustomFormInput
                    name="ContractStarts"
                    
                    type="Date"
                  />
                </Col>
                <Col sm="6">
                  <CustomFormSelect options={PropOpt} name="Property" />
                  {/* Where BackEnd */}
                  <CustomFormSelect name="ContractType" options={TypeOpt} />
                  <Row>
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
          <Col sm="4">
            <hr />
            <ReferenceList {...{ loading }} />
            <hr />
          </Col>
          <Col sm="8">
            <hr />
            <Ref2 {...{ loading }} />
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
                  <CustomFormNumberInput
                    name="RequestedAmt"
                    textName="Currency"
                    valueName="Series"
                  />
                  <CustomFormSelect name="PaidCurrency" options={CurrencyOpt} />
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <CustomFormInput name="RentFor" />
                </Col>
                <Col sm="6">
                  <CustomFormSelect name="RentCurrency" options={CurrencyOpt} />
                </Col>

                <Row>
                  <Col style={{ display: "flex", marginTop: "1rem" }}>
                    <CustomFormInputCheckbox name="IsSale" />
                    <CustomFormInputCheckbox name="IsRent" />
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
                  <CustomFormNumberInput
                    name="AdvanceAmt"
                    options={PartyTypeOptions}
                  />
                  <CustomFormInput name="Lawyer" />
                  <CustomFormSelect
                    name="AdvanceCurrency"
                    options={CurrencyOpt}
                  />
                </Col>
                <Col sm="6">
                  <CustomFormInput type="number" name="InsuranceAmt" />
                  <CustomFormSelect
                    name="InsuranceCurrency"
                    options={CurrencyOpt}
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
                  <Ref3 {...{ loading }} />
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
          series={params?.Series}
          refDoctype="Data"
          
        />
      </Form>
    </FormProvider>
  );
};

export default POST;
