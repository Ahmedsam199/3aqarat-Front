// ** React Import
import React, { useContext, useEffect, useMemo, useState } from "react";
// ** Custom Components
import { toasty } from "@toast";
// ** Utils
import { isObjEmpty } from "@utils";
// ** Third Party Components
import { useNavigate } from "react-router";
import Breadcrumbs from "@components/breadcrumbs";
import { yupResolver } from "@hookform/resolvers/yup";
import { AbilityContext } from "@src/utility/context/Can";
import { insertItem, updateItem } from "@store/actions/data";
import { checkPortions, deepCopy, toBoolean } from "@utils";
import { PaymentTermTemplate as Schema } from "@validation";
import CustomFormInput from "@Component/Form/CustomFormInput";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {  useParams } from "react-router";
import { toast } from "react-toastify";
import Routes from "@Routes";
import { Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";
// import { ErrorToast } from "../../../components/ErrorToast";
// import { sleep } from "../../../utility/Utils";
import axios from "axios";
import Details from "./Details";
const POST = (props) => {
  const {
    Payments,
    Property,

    Currency,
    Contracts,
    Party,
    Offline,
    Lawyer,
    PaymentTypes,
    PaymentTermTemplate,
    tempData: { network },
  } = useSelector((state) => state);
  const ability = useContext(AbilityContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // const history = useHistory();
  const params = useParams();
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: { _loading: true },
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
  console.log(errors);
  // component for change master in row of array
  const _write = (
    () => toBoolean(ability.can("write", "DT-3")),
    [ability.can("write", "DT-3")]
  );
const navigate = useNavigate();
  // ** Function to handle form submit
  const onSubmit = async (values) => {
    // if (!checkPortions(values.PartialInfo))
    //   return toast.error(
    //     // <ErrorToast msg="Sum of Partions must be equal 100" />
    //   );

    // values.PartialInfo = JSON.stringify(values.PartialInfo);

    try {
      if (isObjEmpty(errors)) {
        setLoading(true);
        dispatch(
          values.Series
            ? updateItem("PaymentTermTemplate", values)
            : insertItem("PaymentTermTemplate", values)
        )
          .then((res) => {
            toasty({ type: "success" });
            setLoading(false);

            navigate("/Setup/PaymentTermTemplate");
          })
          .catch((err) => {
            setLoading(false);

            console.log("hacker_it_err", err);
          });
      }
    } catch (e) {
      console.error("hacker_it error", e);
    } finally {
      
    }
  };
  const updateFormData = async () => {
    try {
      if (params.Series) {
        const _ = deepCopy(
          PaymentTermTemplate.find((x) => x.Series === params.series)
        );

        const PartialInfo = JSON.parse(_.PartialInfo);

        await Promise.all([
          reset({
            ..._,
            PartialInfo: PartialInfo,
            _loading: false,
            _write,
          }),
          then(() => {
            setLoading(false);
          }),
        ]);
      } else {
        reset({
          _write,
          _loading: false,
          PartialInfo: [{}],
        });
        then(() => {
          setLoading(false);
        });
      }
    } catch (e) {
      console.error("hacker_it error", e);
    }
  };

   useEffect(async () => {
     if (params.series) {
       if (!PaymentTermTemplate.length) return;
       if (network) {
         const { data } = network
           ? await axios.get(`${Routes.PaymentTermTemplate.root}/${params.series}`)
           : _;
         reset({
           ...data,
           _loading: false,
           _write,
         });
       } else {
         const _ = Offline.PaymentTermTemplate.find((x) => x.ID == params.series);

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
   }, [PaymentTermTemplate]);
  
  

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
          <Row>
            <Col sm="11">
              
            </Col>
            <Col
              sm="1"
              className={`d-flex align-items-center justify-content-${
                _dataForm.Series && (!params.series || _write)
                  ? "between"
                  : "end"
              }`}
            >
              <Button
                type="submit"
                className="mr-1"
                color="primary"
                // disabled={loading || (params.series && !_write)}
              >
                Save
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="4">
                      <CustomFormInput
                        name="PaymentTerm"
                        title="Template Name"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12">
                      <Details {...{ loading }} />
                    </Col>
                    <hr />
                  </Row>
                  {/* forth */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <input type="hidden" {...register("Series")} />
          <input type="hidden" {...register("_write")} />
          <input type="hidden" {...register("_loading")} />
        </Form>
      </FormProvider>
    </>
  );
};

export default POST;
