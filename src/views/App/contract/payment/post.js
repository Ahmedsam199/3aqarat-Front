// ** React Import
import React, { useContext, useEffect, useMemo, useState } from "react";

// ** Custom Components
// ** Utils
import { isObjEmpty, sendAttachment, toBoolean } from "@utils";
// ** Third Party Components
import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import Routes from "@Routes";
import { AbilityContext } from "@src/utility/context/Can";
import { insertItem, updateItem } from "@store/actions/data";

import AttachmentComponent from "@Component/Attachment";
import { Payment as Schema } from "@validation";
import axios from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";
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
import getPrintDate from "@Print/getData/Payment";
import PrintDropDown from "@Component/PrintDropDown";
import PreviewFormValue from "../../../../components/Form/PreviewFormValue";
import { arrToHashMap } from "../../../../utility/Utils";
import Contract from "../../../../router/routes/App/Contract";
import { parseNumber } from "../../../../utility/Utils";
import { getValue } from "@mui/system";
const POST = (props) => {
  const { t } = useTranslation();
  const {
    Payments,
    Property,
    PropertyType,
    Currency,
    Contracts,
    Party,
    Offline,
    Lawyer,
    PaymentTypes,
    tempData: { network },
  } = useSelector((state) => state);
  const [GetReq, SetGetReq] = useState("");
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [Partyies, setParties] = [];
  const ability = useContext(AbilityContext);
  const Attachment = useSelector((state) => state.Attachment);
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
  const _dataForm = useWatch({ control });
  const PartyMap = useMemo(() => arrToHashMap(Party), [Party]);
  // const PurposeMap = useMemo(() => arrToHashMap(Purpose), [Purpose]);
  // ** Function to handle form submit
  useEffect(() => {
    console.log(errors);
  }, [errors]);
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
          Attachment.length > 0 &&
            sendAttachment({
              files: Attachment,
              refDoctype: "Payment",
              refSeries: res?.Series,
            });
          navigate("/Contract/Payment");
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
  const WatchPaymentType = useWatch({ control, name: "PaymentType" });
  const WatchAmount = useWatch({ control, name: "Amount" });
  const _watchReference = useWatch({ control, name: "Contract" });

  const _watchCurrency = useWatch({ control, name: "Currency" });

  const getExRate = () => {
    if (
      !!getValues("PaymentType") &&
      !!getValues("Contract") &&
      !!getValues("ReceiveParty") &&
      !!getValues("PayParty") &&
      !!getValues("Currency")
    ) {
      axios
        .get(
          `http://75.119.128.241:4500/Payment/RateEx/?PayParty=${getValues(
            "PayParty"
          )}&ReceiveParty=${getValues("ReceiveParty")}&Currency=${getValues(
            "Currency"
          )}&Contract=${getValues("Contract")}&PaymentType=${getValues(
            "PaymentType"
          )}`
        )
        .then((res) => {
          console.log("testing", res.data.Outstanding);
          setValue("Outstanding", res.data.Outstanding);
          setValue("CurrencyEXRate", res.data.CurrencyEXRate);
          refreshTotalPay(res.data.CurrencyEXRate);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };

  let PayType = [];
  let firstparty = [];
  let secondparty = [];
  const _ = Contracts?.filter((x) => x.Series === _watchReference).map((x) =>
    Party.forEach((y) => {
      if (y.Series == x.FirstParty) {
        let __x = JSON.parse(x.ExtraPayment);
        PaymentTypes.forEach((z) => {
          if (__x == null) {
            return;
          } else {
            console.log(__x);
            __x.forEach((c) => {
              if (z.Series == c.PaymentType) {
                console.log(c);

                PayType.push({
                  value: z.Series,
                  label: `${z.PaymentType} /From: ${
                    PartyMap.get(c.FromParty).FullName
                  }  /To:${PartyMap.get(c.ToParty).FullName} `,
                });
              }
            });
          }
        });

        // PartyOpt.push({label:y.FullName,value:y.Series})
        // setValue("PayParty", y.Series);
        // ReciveParty.push({ label: y.FullName, value: y.Series });
      }
    })
  );

  let newPayType = [...new Set(PayType)];
  const uniqueIds = new Set();

  const unique = newPayType.filter((element) => {
    const isDuplicate = uniqueIds.has(element.value);

    uniqueIds.add(element.value);

    if (!isDuplicate) {
      return true;
    }

    return false;
  });
  let ContractsArr = [];
  Contracts.forEach((x) => {
    Property.forEach((y) => {
      if (y.Series == x.Property) {
        PropertyType.forEach((c) => {
          if (c.Series == y.PropertyType) {
            Party.forEach((xx) => {
              if (xx.Series == y.Party) {
                ContractsArr.push({
                  label: `${xx.FullName} / ${c.TypeName} / ${x.Series}`,
                  value: x.Series,
                });
              }
            });
          }
        });
      }
    });
  });

  const refreshTotalPay = () => {
    setValue(
      "TotalPay",
      +parseNumber(getValues("Amount")) *
        +parseNumber(getValues("CurrencyEXRate"))
    );
  };
  // useEffect(() => {
  //   getExRate();
  // }, [_watchCurrency]);
  // useEffect(()=>{
  //   getExRate();
  // },[_watchReference])
  const [PayParty, SetPayParty] = useState([]);
  const [ReciveParty, SetReciveParty] = useState([]);
  const SendPayType = () => {
    if (!!getValues("PaymentType") && !!getValues("Contract")) {
      axios
        .get(
          `http://75.119.128.241:4500/Payment/GetParties/?PayType=${getValues(
            "PaymentType"
          )}&Contract=${getValues("Contract")}`
        )
        .then(({ data }) => {
          console.log(
            "testing",
            data.map((x) => ({ value: x.PayParty, label: x.PayParty }))
          );
          SetPayParty(
            data.map((x) => ({ value: x.PayParty, label: x.PayParty }))
          );
          SetReciveParty(
            data.map((x) => ({
              value: x.ReceiveParty,
              label: x.ReceiveParty,
            }))
          );
          // clg;
          // data.forEach((x) =>
          //   firstparty.push({ value: x.PayParty, label: x.PayParty })
          // );
          // data.map((x) =>
          //   secondparty.push({ value: x.ReceiveParty, label: x.ReceiveParty })
          // );
        });
    } else {
      return;
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
        <Row>
          <Card>
            <CardBody>
              <Row style={{ justifyContent: "end", marginBottom: "1rem" }}>
                <Col
                  sm="2"
                  className="d-flex justify-content-end align-items-center"
                >
                  <Button
                    color="primary "
                    type="submit"
                    style={{ marginRight: "1rem" }}
                    disabled={loading || (params.series && !_write)}
                  >
                    {loading && (
                      <Spinner color="white" size="sm" className="mr-1" />
                    )}
                    {t("Save")}
                  </Button>
                  {params.series && (
                    <PrintDropDown
                      Doctype={["DT-6"]}
                      getDate={async () =>
                        await getPrintDate({
                          data: getValues(),
                          PartyMap,
                        })
                      }
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <CustomFormSelect
                    name="Contract"
                    // valueName="Series"
                    // textName="Series"
                    options={ContractsArr}
                    extraOnChangeFun={SendPayType}
                  />
                  <CustomFormSelect
                    name="Currency"
                    options={Currency}
                    textName="CurrencyName"
                    valueName="Series"
                    extraOnChangeFun={getExRate}
                  />
                </Col>
                <Col sm="6">
                  {_watchReference ? (
                    <div>
                      <CustomFormSelect
                        filterOption={(x) =>
                          getValues(`ReceiveParty`) !== x.value
                        }
                        getOptionLabel={(option) => (
                          <>{PartyMap.get(option.value).FullName}</>
                        )}
                        extraOnChangeFun={getExRate}
                        name="PayParty"
                        options={PayParty}
                      />
                      <CustomFormSelect
                        filterOption={(x) => getValues(`PayParty`) !== x.value}
                        name="ReceiveParty"
                        extraOnChangeFun={getExRate}
                        getOptionLabel={(option) => (
                          <>{PartyMap.get(option.value).FullName}</>
                        )}
                        options={ReciveParty}
                      />
                    </div>
                  ) : (
                    <div>
                      <Alert className="p-5" color="danger">
                        <center>
                          You Must Choose Contract First To Choose First And
                          Second Party
                        </center>
                      </Alert>
                    </div>
                  )}
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
                  <CustomFormNumberInput
                    extraOnChangeFun={refreshTotalPay}
                    name="Amount"
                  />
                </Col>
                <Col sm="6">
                  <CustomFormInput IsDisabled={true} name="Outstanding" />
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <CustomFormSelect
                    name="PaymentType"
                    // textName="PaymentType"
                    // valueName="Series"
                    extraOnChangeFun={SendPayType}
                    options={PayType}
                  />
                  {/* <PreviewFormValue name="Amount" /> */}
                </Col>
                <Col sm="6">
                  <CustomFormInput
                    name="PostingDate"
                    textName="Currency"
                    type="Date"
                    valueName="Series"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <CustomFormNumberInput
                    IsDisabled={true}
                    name="CurrencyEXRate"
                  />
                </Col>
                <Col sm="6">
                  <CustomFormNumberInput IsDisabled={true} name="TotalPay" />
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
          refDoctype="Payment"
        />
      </Form>
    </FormProvider>
  );
};
export default POST;
