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
import { Branch as Schema } from "@validation";
import { useContext, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Form, Spinner } from "reactstrap";
import toast from "react-hot-toast";
const POST = ({ onToggle, row, toggleFunc }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const ability = useContext(AbilityContext);
  const { Branches } = useSelector((state) => state);
  const methods = useForm({ resolver: yupResolver(Schema) });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = methods;
  const _dataForm = useWatch({ control });
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
    if (values.isGroup == true && values.ParentBranch == null) {
      toast.error("Parent Branch is Required");
    } else {
      setLoading(true);
      console.log(values);
      dispatch(
        values.Series
          ? updateItem("Branches", values)
          : insertItem("Branches", values)
      )
        .then((res) => {
          toast.success("");
          clear();
          toggle();
        })
        .catch((err) => {
          console.log("hacker_it_err", err);
          toast.error(err.response.data.message);
        });
      setLoading(false);
    }
  };
  useEffect(() => {
    toggleFunc.current = toggle;
  }, []);
  let BranchOpt = [];


  const _watchIsGroup = useWatch({ control, name: "isGroup" });
  console.log(_watchIsGroup);
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
            <CustomFormInput name="BranchName" />

            <CustomFormInputCheckbox name="isGroup" />
            {_watchIsGroup ? (
              <CustomFormSelect
                options={Branches?.filter((x) => {
                  return x.isGroup
                })}
                textName="BranchName"
                valueName="Series"
                name="ParentBranch"
              />
            ) : (
              ""
            )}

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
