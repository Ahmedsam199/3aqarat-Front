// import LoadingTable from "@componentsLocal/Loading/Table";
import { sleep, toBoolean } from "@utils";
// import { ErrorMessage } from "components/ErrorMessage";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { useRef } from "react";
import { Lock, Plus, Trash2 } from "react-feather";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Button, Table } from "reactstrap";
import CustomFormInputCheckbox from "@Component/Form/CustomFormInputCheckbox";

import CustomSelect from "@Component/CustomSelect";
import { useSelector } from "react-redux";
import { t } from "i18next";
// import CustomFormNumberInputV2 from "@Component/Form/CustomFormNumberInputV2";
// import { BaseOnOptionsPaymentTermTemplate } from "../../../FixedOptions";
const WIDTHS = ["5%", "15%", "15%", "15%", "15%", "15%", "15%", "20%"];

const DetailsList = ({ loading }) => {
  const ref = useRef();
  const {
    Payments,
    Property,
DocType,
    Currency,
    Contracts,
    Party,
    Offline,
    Lawyer,
    PaymentTypes,
    PaymentTermTemplate,
    Roles,
    tempData: { network },
  } = useSelector((state) => state);
  const {
    control,
    register,
    getValues,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useFormContext();
  const _dataFormWatch = useWatch({ control });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "JsonData",
  });

  return (
    <>
      <h5 className="mb-1 text-center">
        Permissions <Lock />
      </h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: "40%" }}>{t("DocType")}</th>
              <th style={{ width: "10%" }}>{t("Read")}</th>
              <th style={{ width: "10%" }}>{t("Write")}</th>
              <th style={{ width: "10%" }}>{t("Create")}</th>
              <th style={{ width: "10%" }}>{t("Delete")}</th>
              <th style={{ width: "10%" }}>{t("Actions")}</th>
            </tr>
          </thead>
          <tbody {...{ ref }}>
            {toBoolean(_dataFormWatch._loading) ? (
              <div widths={WIDTHS} />
            ) : (
              fields.map((x, index) => {
                return (
                  <div key={x.id}>
                    <tr>
                      <th style={{ width: WIDTHS[0] }} scope="row">
                        {index + 1}
                      </th>
                      
                      <td style={{ width: "36%" }}>
                        <CustomFormSelect
                          textName="DocType"
                          valueName="Series"
                          style={{ overflow: "hidden" }}
                          menuPosition="fixed"
                          menuShouldBlockScroll
                          hiddenTitle
                          filterOption={(x) =>
                            !getValues().JsonData.some(
                              (y) => y.DocType == x.value
                            ) ||
                            getValues(`JsonData.${index}.DocType`) === x.value
                          }
                          name={`JsonData.${index}.DocType`}
                          options={DocType}
                          className="w-100"
                        />
                      </td>
                      <td style={{ width: "10%" }}>
                        <CustomFormInputCheckbox
                          hiddenTitle
                          style={{ marginTop: "10px" }}
                          type="checkbox"
                          name={`JsonData.${index}.Read`}
                        />
                      </td>

                      <td style={{ width: "10%" }}>
                        <CustomFormInputCheckbox
                          type="checkbox"
                          hiddenTitle
                          name={`JsonData.${index}.Write`}
                        />
                      </td>

                      <td style={{ width: "10%" }}>
                        <CustomFormInputCheckbox
                          type="checkbox"
                          menuPosition="fixed"
                          menuShouldBlockScroll
                          hiddenTitle
                          name={`JsonData.${index}.Delete`}
                        />
                      </td>
                      <td style={{ width: "10%" }}>
                        <CustomFormInputCheckbox
                          type="checkbox"
                          menuPosition="fixed"
                          menuShouldBlockScroll
                          hiddenTitle
                          name={`JsonData.${index}.Create`}
                        />
                      </td>

                      <td style={{ width: "10%" }}>
                        {toBoolean(_dataFormWatch._write) && (
                          <Button.Ripple
                            className="btn-icon"
                            color="flat-danger"
                            onClick={async () => {
                              await Promise.all([remove(index)]);
                            }}
                          >
                            <Trash2 size="15" />
                          </Button.Ripple>
                        )}
                      </td>
                    </tr>
                  </div>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
      <div>
        <small className="my-1 text-danger d-block">
          {/* <ErrorMessage error={errors[`JsonData`]?.message} /> */}
          <ul>
            {Array.isArray(errors[`JsonData`]) &&
              errors[`JsonData`].map((x, i) =>
                Object.keys(x)?.map((e) => (
                  <li>
                    {" "}
                    {/* <ErrorMessage
                      arrayName="JsonData"
                      index={i}
                      propName={e}
                      error={x[e]?.message}
                    />{" "} */}
                  </li>
                ))
              )}
          </ul>
        </small>
        {toBoolean(_dataFormWatch._write) && (
          <Button.Ripple
            className="btn-icon"
            color="success"
            // disabled={typeof _dataFormWatch.ApplyOn !== 'boolean'}
            onClick={() => {
              append({});
              sleep(100).then(
                () => (ref.current.scrollTop = ref.current.scrollHeight)
              );
            }}
          >
            <Plus size={14} />
          </Button.Ripple>
        )}
      </div>
    </>
  );
};

export default DetailsList;
