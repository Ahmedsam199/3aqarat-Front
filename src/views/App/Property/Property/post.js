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
import {Currency} from '@FixedOptions'
import axios from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";
import { Map, Marker } from "pigeon-maps";
import Ref2 from "./Ref2";
import Ref1 from "./Ref1";
import { toast } from "react-toastify";
// import { confirmAlert2 } from '../../../utility/alert';
const POST = (props) => {
  const { t } = useTranslation();
  const { Property_Property, Property_Terrority, Setup_Purpose } = useSelector(
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
useEffect(() => {
  console.log("testing", errors);
}, [errors]);
  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      values.PartyType = toBoolean(values.PartyType);
      setLoading(true);
      dispatch(
        values.Series
          ? updateItem("Property_Property", values)
          : insertItem("Property_Property", values)
      )
        .then((res) => {
          toast.success('')
          navigate("/Properity/Properity");
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
      if (!Property_Property.length) return;
      // const _ = Party.find((x) => x.Series === params.series);
      const { data } = await axios.get(
        `${Routes.Property_Property.root}/${params.series}`
      );

      console.log("testing ", data);

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
  }, [Property_Property]);
  let TerrOpt=[]
Property_Terrority.forEach((x)=>{
    TerrOpt.push({ value: x.Series, label: x.Series + " " + x.Territory });
  });
  let PurposeOpt = [];
  Setup_Purpose.forEach((x) => {
    PurposeOpt.push({ value: x.Series, label: x.Series + " " + x.Purpose });
  });
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
        <Row>
          <Col sm="10"></Col>
          <Col sm="2" className="d-flex justify-content-end align-items-center">
            <Button
              color="primary"
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
          <Col sm="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="6">
                    <CustomFormSelect name="Party" options={PartyTypeOptions} />
                    <CustomFormSelect options={TerrOpt} name="Territory" />
                    <CustomFormSelect name="Currency" options={Currency} />
                  </Col>
                  <Col sm="6">
                    <CustomFormSelect options={PurposeOpt} name="Purpose" />
                    <CustomFormInput name="RequestedAmt" />

                    <Row>
                      <Col sm="6" style={{ marginTop: "2rem" }}>
                        <CustomFormInputCheckbox
                          name="IsFurnished"
                          IsDisabled={_dataForm.Disabled}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Row>
            <Col sm="4">
              <hr />
              <Ref1 {...{ loading }} />
              <hr />
            </Col>
            <Col sm="8">
              <hr />
              <Ref2 {...{ loading }} />
              <hr />
            </Col>
          </Row>
        </Row>
        <Col sm="12">
          <Map height={300} defaultCenter={[36.1901, 43.993]} defaultZoom={11}>
            <Marker width={50} anchor={[36.1901, 43.993]} />
          </Map>
        </Col>
      </Form>
    </FormProvider>
  );
};

export default POST;
