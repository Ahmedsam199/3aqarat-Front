// ** React Import
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
// ** Utils

import {
  isObjEmpty,
  sendAttachment,
  sendAttachmentV2,
  toBoolean,
} from "@utils";
import AttachmentComponent from "@Component/Attachment";
import AttachmentComponent2 from "@Component/Attachment2";


import ImageGallery from "react-image-gallery";
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
import { Property as Schema } from "@validation";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import PrintDropDown from "@Component/PrintDropDown";
import axios from "axios";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import getPrintDate from "@Print/getData/Property";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Row, Spinner } from "reactstrap";
import { Map, Marker, GeoJson, GeoJsonFeature, Point, } from "pigeon-maps";
import Furnitures from "./Furnitures";
import Attributes from "./Attributes";
import toast from "react-hot-toast";
import './css.scss'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
// import Carousel from "react-bootstrap/Carousel";
// import { confirmAlert2 } from '../../../utility/alert';
const POST = (props) => {
  const { t } = useTranslation();
  const {
    Property,
    Party,
    Territory,
    ContractType,
    Currency,
    PropertyAttr,
    PropertyType,
  } = useSelector((state) => state);
  const ability = useContext(AbilityContext);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
const [Gallerys,SetGallery]=useState([])
  const [isAttachmentModalOpen2, setIsAttachmentModalOpen2] = useState(false);
  const Attachment = useSelector((state) => state.Attachment);
  const Attachment2 = useSelector((state) => state.Attachment2);
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
    if (values.IsFurnished == true && values.Furnitures.length == 0) {
      toast.error("You Must Add Furnitures");

    } else if (values.Attributes == undefined || values.Attributes.length == 0) {
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
            toast.success();
            if(Attachment2.length >0){
sendAttachmentV2({
  files: Attachment2,
  refDoctype: "Property_Gallery",
  refSeries: res?.Series,
});
            }
            if (Attachment.length > 0) {
              sendAttachment({
                files: Attachment,
                refDoctype: "Property",
                refSeries: res?.Series,
              });
              navigate("/Properties/Property");
            } else {
              navigate("/Properties/Property");
            }
            
            
          })
          .catch((err) => {
            console.log("hacker_it_err", err);
            // toast.error(err.response.data.message);
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
console.log("object",data);
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
  const _watchRequestedAmt = useWatch({ control, name: "RequestedAmt" });
useEffect(() => {
  setValue("RequestedAmt2", _watchRequestedAmt);
}, [_watchRequestedAmt]);
const GetGallery=()=>{
  if(params.series){

}

}
const BuyNow=()=>{
  navigate(`/Contract/CreateContract/${params.series}`);
}
  const [modal, setModal] = useState(false);
// useEffect(()=>{
// if(params?.series){
//   axios
//     .get(`http://193.47.189.15:4500/Attachment/${params?.series}`)
//     .then((res) => {
//       SetGallery(res.data);
//     }); 
// }
// },[Property])

  const toggle = () => {
axios
  .get(`http://193.47.189.15:4500/Attachment/${params?.series}`)
  .then((res) => {
    SetGallery(res.data.map((x) => ({ original: x.Link, thumbnail:x.Link})));
  });
       setModal(!modal)
  
  };
  const highlight = document.querySelector(".gallery-hightlight");
  const previews = document.querySelectorAll(".room-preview img");

  const imagePrivew=useRef()
  function imageGallery() {
console.log(previews);
    previews.forEach((preview) => {
      highlight.addEventListener("click", function () {
        const smallSrc = this.src;
        const bigSrc = smallSrc.replace("small", "big");
        previews.forEach((preview) => preview.classList.remove("room-active"));
        highlight.src = bigSrc;
        preview.classList.add("room-active");
      });
    });
  }
imageGallery();
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Row style={{ justifyContent: "end", marginBottom: "1rem" }}>
                  <Col sm="10"></Col>
                  <Row></Row>
                  <Col
                    sm="2"
                    className="d-flex justify-content-end align-items-center"
                  >
                    <Button
                      style={{ marginRight: "1rem" }}
                      color="primary"
                      type="submit"
                      className=" "
                      disabled={loading || (params.series && !_write)}
                    >
                      {loading && (
                        <Spinner color="white" size="sm" className="" />
                      )}
                      {t("Save")}
                    </Button>
                    {params?.series ? (
                      <Button color="primary" onClick={BuyNow}>
                        Make Contract
                      </Button>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>

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
                      <CustomFormNumberInput name="RequestedAmt" />
                      <CustomFormSelect
                        name="ContractType"
                        textName="ContractType"
                        valueName="Series"
                        options={ContractType}
                      />
                      <CustomFormSelect
                        name="PropertyType"
                        textName="TypeName"
                        valueName="Series"
                        options={PropertyType}
                      />
                    </Col>

                    <Row></Row>
                  </Col>
                  <Col>
                    <br></br>
                    <CustomFormInputCheckbox name="IsFurnished" />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <hr />
            {_watchIsFurnished ? (
              <Furnitures {...{ loading }} />
            ) : (
              <div>
                <Alert className="p-4" color="danger">
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
        </Row>
        <Row>
          <Col sm="12">
            <Attributes {...{ loading }} />
          </Col>
        </Row>

        <Row>
          <Col>
            <input type="hidden" {...register("Latitude")} />
            <input type="hidden" {...register("Longitude")} />
          </Col>
        </Row>
        <Row className="mt-2 mb-2">
          <Col sm="1">
            <Button
              className="ml-1"
              color="primary"
              onClick={() => setIsAttachmentModalOpen(true)}
            >
              Gallery
            </Button>
          </Col>

          <Col>
            {params.series ? (
              <Button color="warning" onClick={toggle}>
                Show Gallery
              </Button>
            ) : (
              ""
            )}
          </Col>
        </Row>
        {/* <Button
          className="ml-1"
          color="primary"
          onClick={() => setIsAttachmentModalOpen2(true)}
        >
          Gallery
        </Button> */}

        <AttachmentComponent
          isModalOpen={isAttachmentModalOpen}
          handleToggleModel={setIsAttachmentModalOpen}
          series={params?.series}
          refDoctype="Property"
        />
        {/* <AttachmentComponent2
          isModalOpen={isAttachmentModalOpen2}
          handleToggleModel={setIsAttachmentModalOpen2}
          series={params?.series}
          refDoctype="Property_Gallery"
        /> */}

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
          {/* <Row>
            <div className="carousel w-full">
              <div id="item1" className="carousel-item w-full">
                <img
                  src="https://placeimg.com/800/200/arch"
                  className="w-full"
                />
              </div>
              <div id="item2" className="carousel-item w-full">
                <img
                  src="https://placeimg.com/800/200/arch"
                  className="w-full"
                />
              </div>
              <div id="item3" className="carousel-item w-full">
                <img
                  src="https://placeimg.com/800/200/arch"
                  className="w-full"
                />
              </div>
              <div id="item4" className="carousel-item w-full">
                <img
                  src="https://placeimg.com/800/200/arch"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
              <a href="#item1" className="btn btn-xs">
                1
              </a>
              <a href="#item2" className="btn btn-xs">
                2
              </a>
              <a href="#item3" className="btn btn-xs">
                3
              </a>
              <a href="#item4" className="btn btn-xs">
                4
              </a>
            </div>
          </Row> */}
        </Col>
      </Form>
      <input
        className="d-none"
        {...register("RequestedAmt2")}
        defaultValue={getValues("RequestedAmt2")}
      />
      <input
        className="d-none"
        {...register("Available")}
        defaultValue={getValues("Available")}
      />
      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Property Gallery</ModalHeader>
        <ModalBody>
          <>
            <center>
              <ImageGallery items={Gallerys} />
            </center>
          </>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Exit
          </Button>
        </ModalFooter>
      </Modal>
    </FormProvider>
  );
};

export default POST;
