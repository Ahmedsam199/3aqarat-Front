// ** React Import
import React, { useContext, useEffect, useMemo, useState } from "react";

// ** Custom Components
// ** Utils
import { isObjEmpty, sendAttachment, toBoolean } from "@utils";
// ** Third Party Components
import CustomFormInput from "@Component/Form/CustomFormInput";
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
import { Alert, Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";
import getPrintDate from '@Print/getData/Payment';
import PrintDropDown from "@Component/PrintDropDown";
import PreviewFormValue from "../../../../components/Form/PreviewFormValue";

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
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
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
    formState: { errors },
    control,
    handleSubmit,
  } = methods;
  const _dataForm = useWatch({ control });
  // ** Function to handle form submit
  useEffect(() => {
    console.log(errors);
  }, [errors])
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
          if (Attachment.length > 0) {
            sendAttachment({
              files: Attachment,
              refDoctype: "Payment",
              refSeries: res?.Series,
            })
            navigate("/Contract/Payment");
          } else {
            navigate("/Contract/Payment");
          }
        })

        .catch((err) => {
          console.log("hacker_it_err", err);
          toast.error(err.response.data.message)
        })
        .finally(() => {
          setLoading(false);
          navigate("/Contract/Payment");
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
  
  
  let PartyOpt = [];

  
  const _watchReference = useWatch({ control, name: "Reference" });
  const _ = Contracts?.filter((x) => x.Series === _watchReference).map((x) =>
    PartyOpt.push(
      { label: x.FirstParty, value: x.FirstParty },
      { label: x.SecondParty, value: x.SecondParty }
    )
  );
  console.log(_)
  
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
        <Row style={{ justifyContent: "end", marginBottom: "1rem" }}>
          <Col sm="2" className="d-flex justify-content-end align-items-center">
            <Button
              color="primary "
              type="submit"
              style={{ marginRight: "1rem" }}
              disabled={loading || (params.series && !_write)}
            >
              {loading && <Spinner color="white" size="sm" className="mr-1" />}
              {t("Save")}
            </Button>
            {params.series && (
              <PrintDropDown
                Doctype={["DT-6"]}
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
                    name="Reference"
                    textName="Series"
                    valueName="Series"
                    options={Contracts}
                  />
                  <CustomFormSelect
                    name="Currency"
                    options={Currency}
                    textName="CurrencyName"
                    valueName="Series"
                  />
                </Col>
                <Col sm="6">
                  {_watchReference ? (
                    <div>
                      <CustomFormSelect
                        filterOption={(x) =>
                          getValues(`ReceiveParty`) !== x.value
                        }
                        name="PayParty"
                        options={PartyOpt}
                      />
                      <CustomFormSelect
                        filterOption={(x) => getValues(`PayParty`) !== x.value}
                        name="ReceiveParty"
                        options={PartyOpt}
                      />
                    </div>
                  ) : (
                    <div>
                      <Alert className="p-5" color="danger">
                        <center>
                          You Must Choose Reference First To Choose First And
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
                  <CustomFormSelect name="Purpose" textName="Purpose" valueName="Series" options={Purpose} />
                </Col>
                <Col sm="6">
                  <CustomFormInput name="Amount" />
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
