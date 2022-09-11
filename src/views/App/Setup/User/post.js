import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormInputCheckbox from "@Component/Form/CustomFormInputCheckbox";
import CustomFormDateInput from "@Component/Form/CustomFormDateInput";
import Sidebar from "@components/sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import { AbilityContext } from "@src/utility/context/Can";
import { insertItem, updateItem } from "@store/actions/data";
import Select from "react-select";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { toasty } from "@toast";
import { toBoolean } from "@utils";
import { Setup_User as Schema } from "@validation";
import { useContext, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Form, Spinner } from "reactstrap";
import toast from "react-hot-toast";
const POST = ({ onToggle, row, toggleFunc }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
    const { Currency, Roles } = useSelector((state) => state);

  const ability = useContext(AbilityContext);
  const methods = useForm({ resolver: yupResolver(Schema) });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const _write = useMemo(
    () => toBoolean(ability.can("write", "DT-13")),
    [ability.can("write", "DT-13")]
  );
  const clear = () => {
    reset({ _write: true, ConverstionFactor: 0, UOM: "", Series: "" });
  };
  useEffect(() => {
    if (row != undefined) {
      // update
      setModal(true);
      reset({ ...row, _write }, { keepDefaultValues: true });
    } else {
      // create new one
      clear();
    }
  }, [row]);

  const toggle = () => {
    setModal(!modal);
    onToggle();
    clear();
  };
 
  const onSubmit = async (values) => {
    let FromDate = Date.parse(values.FromDate);
    let ToDate = Date.parse(values.ToDate); 
    if(FromDate>ToDate){
toast.error("From Date Cannot Be Bigger Than To Date");
    }else if (ToDate<FromDate){
toast.error("To Date Cannot be smaller than From Date");
    }else{
    setLoading(true);
    console.log(values)
    dispatch(
      values.Series
        ? updateItem("Setup_User", values)
        : insertItem("Setup_User", values)
    )
      .then((res) => {
        toast.success("")
        clear();
        toggle();
      })
      .catch((err) => {
        console.log("hacker_it_err", err);
        // toast.error(err.response.data.message);
      });
    setLoading(false);
  }};
  useEffect(() => {
    toggleFunc.current = toggle;
  }, []);
  let CurrencyOpt = [];
  Currency.forEach((x) => {
    CurrencyOpt.push({
      value: x.Series,
      label: x.Series + " " + x.CurrencyName,
    });
  });
  let RolesOpt = [];
  Roles.forEach((x) => {
    RolesOpt.push({
      value: x.Series,
      label: x.Series + " " + x.RoleName,
    });
  });
  let lang=[
                { value: 0, label: "Kurdish" },
                { value: 1, label: "Arabic" },
                { value: 2, label: "English" },
                { value: 3, label: "Turkish" },
              ]
  return (
    <>
      <Sidebar
        size="lg"
        open={modal}
        title={row?.Series ? "Update" : "NEW"}
        Series={row?.Series}
        headerClassName="mb-1"
        toggleSidebar={toggle}
      >
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* s</ModalHeader> */}
            <CustomFormInput name="FullName" />
            <CustomFormInput name="UserName" />
            <CustomFormInput type="password" name="Password" />
            <CustomFormSelect
              name="DefaultLanguage"
              values={lang[0]}
              options={lang}
            />
            <CustomFormSelect name="DefaultCurrency" options={CurrencyOpt} />
            <CustomFormSelect name="RoleID" options={RolesOpt} />
            <CustomFormInput name="FromDate" type="Date" />
            <CustomFormInput name="ToDate" type="Date" />
            <CustomFormInputCheckbox name="Disabled" />
            <div className="mt-1">
              <Button
                color="primary"
                type="submit"
                className="mr-1"
                disabled={loading || (row && !_write)}
              >
                {loading && (
                  <Spinner color="white" size="sm" className="mr-1" />
                )}
                {t("Save")}
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                color="secondary"
                onClick={toggle}
              >
                {t("Cancel")}
              </Button>
            </div>
          </Form>
        </FormProvider>
      </Sidebar>
    </>
  );
};

export default POST;
