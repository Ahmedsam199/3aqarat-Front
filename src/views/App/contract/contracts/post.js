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
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Form,

  Row,
  Spinner,
} from "reactstrap";
import Modal from "react-bootstrap/Modal";

import Furnitures from "./Furnitures";
import ExtraPayment from "./ExtraPayment";
import Attribute from "./Attribute";
import getPrintDate from "@Print/getData/Contract";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import { arrToHashMap } from "../../../../utility/Utils";
const POST = (props) => {
  const { t } = useTranslation();
  const {
    Contracts,
    ContractType,
    Property,
    Party,
    Currency,
    PropertyAttr,
    Lawyer,
    CurrencyExchange,
    tempData: { network },
    Offline,
  } = useSelector((state) => state);
  
  const PartyMap = useMemo(() => arrToHashMap(Party), [Party]);
  const CTypeMap = useMemo(() => arrToHashMap(ContractType), [ContractType]);
  const AttributeMap = useMemo(
    () => arrToHashMap(PropertyAttr),
    [PropertyAttr]
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
    setValue,
    formState: { errors },
    control,
    handleSubmit,
  } = methods;
  console.log(errors)
  const Attachments = useSelector((state) => state.Attachment);
  const _dataForm = useWatch({ control });
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const _watchType = useWatch({ control, name: "TypeOfTran" });
  // ** Function to handle form submit
  useEffect(() => {}, [errors]);
  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      console.log(errors)
      values.PartyType = toBoolean(values.PartyType);

      const identifier = network ? values.Series : values.ID;
      let FromDate = Date.parse(values.ContractStarts);
      let ToDate = Date.parse(values.ContractEnds);
      console.log(values);
      
        if (FromDate > ToDate) {
          toast.error(
            "Contract Start Cannot Be Bigger Than Contracts Ends or HandoverDate  "
          );
        } else if (ToDate < FromDate) {
          toast.error("Contract End Cannot be smaller than Contract Start");
        } else if (Date.parse(FromDate > Date.parse(values.ContractDate))) {
          toast.error("ContractDate Cannot be done After Contract Starts");
        } else if (FromDate > Date.parse(values.HandoverDate)) {
          toast.error(
            "Contract Start Cannot Be Bigger Than Contracts Ends or HandoverDate "
          )
        }
        else if (_watchType == true && values.PaidCurrency === undefined) {
          toast.error("Paid Amount And Paid Currency Cannot Be Empty");
        } else if (_watchType == true && values.PaidAmt === 0) {
          toast.error(
            "Paid Amount And Paid Currency Cannot Be Empty OR greater Than 0"
          );
        } else if (
          (_watchType == false && values.RentFor === 0) ||
          (_watchType == false && values.RentCurrency === undefined)
        ) {
          toast.error(
            "Rent And Rent Currency Cannot Be Empty OR greater Than 0"
          );
        } else {
          setLoading(true);
          dispatch(
            identifier
              ? updateItem("Contracts", values)
              : insertItem("Contracts", values)
          )
            .then((res) => {
              toast.success();
              if (Attachments.length > 0) {
                sendAttachment({
                  files: Attachments,
                  refDoctype: "Data",
                  refSeries: res?.Series,
                });
                navigate("/Contract/Contract");
              } else {
                navigate("/Contract/Contract");
              }
            })
            .catch((err) => {
              // console.log("hacker_it_err", err);
              // toast.error(err.response.data.message);
            })
            .finally(() => {
              setLoading(false);
            });
        }
    }
  };
  const _write = useMemo(
    () => toBoolean(ability.can("write", "DT-2")),
    [ability.can("write", "DT-2")]
  );
  useEffect(async () => {
    if (params?.series) {
      if (network) {
        const { data } = await axios.get(
          `${Routes.Contracts.root}/${params.series}`
        );
        reset({
          ...data,
          _loading: false,
          _write,
        });
      } else {
        const _ = Offline.Contracts.find((x) => x.ID == params.series);
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
  const {
    fields: fieldsFurnitures,
    append: appendFurnitures,
    remove: removeFurnitures,
    replace: ReplaceFurniture,
  } = useFieldArray({
    control,
    name: "Furnitures",
  });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "Attributes",
  });
  // To Be Backed Later
  params?.series
    ? useEffect(() => {
        Property.forEach((x) => {
          if (x.Series == _watchProperty) {
            setValue("FirstParty", x.Party);

            if (x.Furnitures.length == 0) {
              setValue("Furnitures", []);
            }else if(x.Furnitures.length == null){
              setValue("Furnitures", []);
            } else {
              console.log("first", JSON.parse(x.Furnitures));
              setValue("Furnitures", JSON.parse(x.Furnitures));
            }
            if (x.Attributes.length == 0) {
              setValue("Attributes", []);
            } else {
              setValue("Attributes", JSON.parse(x.Attributes));
            }
          }
        });
      }, [Contracts])
    : useEffect(() => {
        Property.forEach((x) => {
          if (x.Series == _watchProperty) {
            setValue("FirstParty", x.Party);
setValue("RequestedAmt", x.RequestedAmt);
            if (x.Furnitures.length == 0) {
              setValue("Furnitures", []);
            }else if(x.Furnitures.length==null){
setValue("Furnitures", []);

            } else {
              console.log("first", JSON.parse(x.Furnitures));
              setValue("Furnitures", JSON.parse(x.Furnitures));
            }
            if (x.Attributes.length == 0) {
              setValue("Attributes", []);
            } else {
              setValue("Attributes", JSON.parse(x.Attributes));
            }
          }
        });
      }, [_watchProperty])
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                getDate={async () =>
                  await getPrintDate({
                    data: getValues(),
                    PartyMap,
                    CTypeMap,
                    AttributeMap,
                  })
                }
              />
            )}
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Furnitures</Modal.Title>
          </Modal.Header>
          <Modal.Body> </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Card>
            <CardBody>
              <Row>
                <center>
                  <Col sm="12">
                    <CustomFormSelect
                      name="TypeOfTran"
                      options={[
                        { value: true, label: "For Sale" },
                        { value: false, label: "For Rent" },
                      ]}
                    />
                  </Col>
                </center>
              </Row>
              RentCurrency
              <Row>
                <Col sm="6">
                  <CustomFormSelect
                    options={Property}
                    valueName="Series"
                    textName="Series"
                    name="Property"
                    // IsDisabled={!!params?.series}
                    // extraOnChangeFun={PropertyChange}
                  />
                  <CustomFormSelect
                    name="ContractType"
                    textName="ContractType"
                    valueName="Series"
                    options={ContractType}
                  />
                </Col>
                <Col sm="6">
                  <Row>
                    {_watchProperty ? (
                      <CustomFormSelect
                        filterOption={(x) =>
                          getValues(`SecondParty`) !== x.value
                        }
                        IsDisabled={true}
                        name="FirstParty"
                        options={Party}
                        textName="FullName"
                        valueName="Series"
                      />
                    ) : (
                      <Alert className="p-1 " color="danger">
                        <center>
                          You Must Choose Property First To Choose First Party
                        </center>
                      </Alert>
                    )}

                    <CustomFormSelect
                      name="SecondParty"
                      textName="FullName"
                      valueName="Series"
                      filterOption={(x) => getValues(`FirstParty`) !== x.value}
                      options={Party}
                    />

                    {/* <CustomFormInputCheckbox
                      name="IsFurnished"
                      IsDisabled={_dataForm.IsDefault}
                    /> */}
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>

        <Row>
          <Card>
            <CardBody>
              <Row>
                <Col sm="6">
                  <CustomFormInput name="ContractStarts" type="Date" />
                  <CustomFormInput name="HandoverDate" type="Date" />
                </Col>

                <Col>
                  <CustomFormInput type="Date" name="ContractEnds" />
                  <CustomFormInput name="ContractDate" type="Date" />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Card>
            <CardBody>
              <Row>
                {_watchType ? (
                  <Row>
                    <Col sm="6">
                      <CustomFormSelect
                        name="PaidCurrency"
                        textName="CurrencyName"
                        valueName="Series"
                        options={Currency}
                      />
                    </Col>
                    <Col sm="6">
                      <CustomFormNumberInput name="PaidAmt" />
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col sm="6">
                      <CustomFormSelect
                        name="RentCurrency"
                        textName="CurrencyName"
                        valueName="Series"
                        options={Currency}
                      />
                    </Col>
                    <Col sm="6">
                      <CustomFormNumberInput name="RentFor" />
                    </Col>
                  </Row>
                )}

                <Col sm="6">
                  <CustomFormInput IsDisabled={true} name="RequestedAmt" />
                </Col>
              </Row>
              <Row></Row>
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
                  <CustomFormSelect
                    valueName="Series"
                    textName="FullName"
                    options={Lawyer}
                    name="Lawyer"
                  />
                  <CustomFormSelect
                    name="AdvanceCurrency"
                    textName="CurrencyName"
                    valueName="Series"
                    options={Currency}
                  />
                </Col>
                <Col sm="6">
                  <CustomFormNumberInput name="InsuranceAmt" />
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
          <Row>
            <Col sm="8">
              <Furnitures
                {...{
                  loading,
                  fieldsFurnitures,
                  appendFurnitures,
                  removeFurnitures,
                  ReplaceFurniture,
                }}
              />
            </Col>
            {/* <br></br> */}
            {/* <hr /> */}
            <Col sm="4">
              <Attribute {...{ loading, fields, append, remove, replace }} />
            </Col>
          </Row>

          <hr />
          {/* <Row></Row> */}
          <Card>
            <CardBody>
              <Row>
                <Col sm="8">
                  <ExtraPayment {...{ loading }} />
                </Col>
                <Col sm="4">
                  {/* Table Go Here */}
                  <CustomFormInput name="Remarks" />
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
        <input type="hidden" {...register("PaidAmt")} />
        <input type="hidden" {...register("RentCurrency")} />
      </Form>
    </FormProvider>
  );
};

export default POST;
