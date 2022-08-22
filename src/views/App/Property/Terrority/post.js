import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormInputCheckbox from "@Component/Form/CustomFormInputCheckbox";
import Sidebar from "@components/sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import { AbilityContext } from "@src/utility/context/Can";
import { insertItem, updateItem } from "@store/actions/data";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { toasty } from "@toast";
import { toBoolean } from "@utils";
import { Property_Terrority as Schema } from "@validation";
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
  const ability = useContext(AbilityContext);
  const { Property_Terrority } = useSelector((state) => state);
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
  useEffect(() => {
    console.log("hacker_it", errors);
  }, [errors]);
  const onSubmit = async (values) => {
    setLoading(true);
    dispatch(
      values.Series
        ? updateItem("Property_Terrority", values)
        : insertItem("Property_Terrority", values)
    )
      .then((res) => {
        toast.success('')
        clear();
        toggle();
      })
      .catch((err) => {
        console.log("hacker_it_err", err);
      });
    setLoading(false);
  };
  useEffect(() => {
    toggleFunc.current = toggle;
  }, []);
  let TerrOpt = [];
  Property_Terrority.forEach((x) => {
    TerrOpt.push({ value: x.Series, label: x.Series + " " + x.Territory });
  });
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
            <CustomFormInput name="Territory" />
            <CustomFormInputCheckbox name="isGroup" />

            <CustomFormSelect options={TerrOpt} name="Parent" />
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
