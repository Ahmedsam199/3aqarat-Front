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
import { toasty } from "@toast";
import { Properites_Property as Schema } from "@validation";
import {Alert} from 'reactstrap'
import axios from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";
import { Map, Marker ,GeoJson,GeoJsonFeature,Point,} from "pigeon-maps";
import Ref2 from "./Ref2";
import Ref1 from "./Ref1";
import  toast  from "react-hot-toast";
// import { confirmAlert2 } from '../../../utility/alert';
const POST = (props) => {
  const { t } = useTranslation();
  const { Property, Party, Territory, Purpose, Currency, PropertyAttr } =
    useSelector((state) => state);
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
  const _dataForm = useWatch({ control });
  // ** Function to handle form submit
useEffect(() => {
  console.log("testing", errors);
}, [errors]);
  const onSubmit = (values) => {
    console.log(values.IsFurnished, values.Furnitures);
    if (values.IsFurnished == true && values.Furnitures.length ==0) {
      toast.error("You Must Add Furnitures");
      
    }else if (values.Attribute == undefined || values.Attribute.length == 0) {
      toast.error("You must Add 1 Attribute At least");
    } else {
      console.log("first", values);
      if (isObjEmpty(errors)) {
        values.PartyType = toBoolean(values.PartyType);
        setLoading(true);
        dispatch(
          values.Series
            ? updateItem("Property", values)
            : insertItem("Property", values)
        )
          .then((res) => {
            toast.success("");
            navigate("/Properity/Properity");
          })
          .catch((err) => {
            console.log("hacker_it_err", err);
            toast.error(err.response.data.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };
  const _write = useMemo(
    () => toBoolean(ability.can("write", "DT-6")),
    [ability.can("write", "DT-6")]
  );
  useEffect(async () => {
    if (params.series) {
      if (!Property.length) return;
      // const _ = Party.find((x) => x.Series === params.series);
      const { data } = await axios.get(
        `${Routes.Property.root}/${params.series}`
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
  }, [Property]);
  
    const _watchIsFurnished = useWatch({ control, name: "IsFurnished" });
    return (
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
          <Row>
            <Col sm="10"></Col>
            <Col
              sm="2"
              className="d-flex justify-content-end align-items-center"
            >
              <Button
                color="primary"
                type="submit"
                className="mr-1 mb-2"
                disabled={loading || (params.series && !_write)}
              >
                {loading && (
                  <Spinner color="white" size="sm" className="mr-1" />
                )}
                {t("Save")}
              </Button>
            </Col>
          </Row>

          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="6">
                      <CustomFormSelect
                        name="Party"
                        textName="FullName"
                        valueName="Series"
                        options={Party}
                      />
                      <CustomFormSelect
                        options={Territory}
                        textName="Territory"
                        valueName="Series"
                        name="Territory"
                      />
                      <CustomFormSelect
                        name="Currency"
                        textName="CurrencyName"
                        valueName="Series"
                        options={Currency}
                      />
                    </Col>
                    <Col sm="6">
                      <Col>
                        <CustomFormInput name="RequestedAmt" />
                        <CustomFormSelect
                          name="Purpose"
                          textName="Purpose"
                          valueName="Series"
                          options={Purpose.filter((x) => {
                            return x.IsPayable;
                          })}
                        />
                      </Col>
                      <Row>
                        <Col>
                          <CustomFormSelect
                            options={PropertyAttr}
                            textName="Attribute"
                            valueName="Series"
                            name="Attributes"
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <br></br>
                      <CustomFormInputCheckbox name="IsFurnished" />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col sm="8">
              <hr />
              {_watchIsFurnished ? (
                <Ref2 {...{ loading }} />
              ) : (
                <div>
                  <Alert className="p-5" color="danger">
                    <center>
                      <p
                        style={{
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                      >
                        Is Not Furnished...
                      </p>
                    </center>
                  </Alert>
                </div>
              )}
            </Col>
            <Col sm="4">
              <hr />
              <Ref1 {...{ loading }} />
            </Col>
          </Row>

          <Row>
            <Col>
              <CustomFormInput IsDisabled={true} name="Longitude" />
            </Col>
            <Col>
              <CustomFormInput IsDisabled={true} name="Latitude" />
            </Col>
          </Row>
          <br></br>
          <Col sm="12">
            <Map
              onClick={(event) => {
                setValue("Longitude", event.latLng[0]);
                setValue("Latitude", event.latLng[1]);
              }}
              height={300}
              defaultCenter={[36.1901, 43.993]}
              defaultZoom={11}
            >
              <Marker
                width={50}
                anchor={[getValues("Longitude"), getValues("Latitude")]}
              />
            </Map>
          </Col>
        </Form>
      </FormProvider>
    );
};

export default POST;
