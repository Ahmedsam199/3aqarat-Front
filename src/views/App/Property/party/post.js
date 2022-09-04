import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormRadioInput from "../../../../components/Form/CustomFormRadioInput";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "../../../../components/Form/CustomFormSelect";
import Sidebar from "@components/sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import { AbilityContext } from "@src/utility/context/Can";
import { insertItem, updateItem } from "@store/actions/data";
import { toasty } from "@toast";
import { toBoolean } from "@utils";
import { Properites_Party as Schema } from "@validation";
import { useContext, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Button, Form, Spinner } from "reactstrap";
import  toast  from "react-hot-toast";
import { GenderOptions } from "@FixedOptions";
const POST = ({ onToggle, row, toggleFunc }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
    reset({
      _write: true,
      ConverstionFactor: 0,
      UOM: "",
      Series: "",
      Gender: undefined,
    });
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
  useEffect(() => {
    console.log("hacker_it", errors);
  }, [errors]);
  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    dispatch(
      values.Series ? updateItem("Party", values) : insertItem("Party", values)
    )
      .then((res) => {
        console.log(res);
        toast.success("");
        clear();
        toggle();
      })
      .catch((err) => {
        console.log("hacker_it_err", err);
        toast.error(err.response.data.message);
      });
    setLoading(false);
  };
  useEffect(() => {
    toggleFunc.current = toggle;
  }, []);
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
            <CustomFormInput type="tel" name="Phone" />
            <CustomFormInput type="tel" name="Cell" />
            <CustomFormInput name="Address" />
            <CustomFormSelect options={GenderOptions} name="Gender" />
            <CustomFormInput name="Remarks" />
            <div className="mt-1">
              <Button
                color="primary"
                type="submit"
                className="mr-1 "
                disabled={loading || (row && !_write)}
              >
                {loading && (
                  <Spinner color="white" size="sm" className="mr-1" />
                )}
                {t("Save")}
              </Button>
              <Button
                color="secondary"
                style={{ marginLeft: "10px" }}
                onClick={toggle}
              >
                {t("Cancel")}
              </Button>
            </div>
            <input type="hidden" {...register("Series")} />
            <input type="hidden" {...register("_write")} />
            <input type="hidden" {...register("_loading")} />
          </Form>
        </FormProvider>
      </Sidebar>
    </>
  );
};

export default POST;
