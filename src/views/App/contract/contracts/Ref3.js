// Joseph : Look at findRate functino please

import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { sleep, toBoolean } from "@utils";
import { useRef } from "react";
import { Plus, Trash2 } from "react-feather";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Row, Table } from "reactstrap";
const RefsList = ({ loading }) => {
  const { t } = useTranslation();
  const ref = useRef();
  const {
    control,
    register,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Extra Payment",
  });
  return (
    <>
      <h5 className="">{t("Extra Payment")}</h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: "30%" }}>{t("Puropose")}</th>
              <th style={{ width: "25%" }}>{t("Paid Amount")}</th>
              <th style={{ width: "25%" }}>{t("Paid Currency")}</th>
            </tr>
          </thead>
          <tbody {...{ ref }}>
            {fields.map((x, index) => {
              return (
                <div key={x.id}>
                  <tr>
                    <th style={{ width: "5%" }} scope="row">
                      {index + 1}
                    </th>
                    <td style={{ width: "30%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        name={`Reference.${index}.currencySeries`}
                        options={[]}
                        valueName="Series"
                        textName="Currency"
                      />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormNumberInput
                        name={`Reference.${index}.amount`}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormNumberInput
                        name={`Reference.${index}.rate`}
                        IsDisabled={true}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: "10%" }}>
                      <Button.Ripple
                        className="btn-icon"
                        color="flat-danger"
                        onClick={async () => {
                          await Promise.all([
                            refreshPaidAmount(null, index),
                            deleteOptions(index),
                            remove(index),
                          ]);
                        }}
                      >
                        <Trash2 size="15" />
                      </Button.Ripple>
                    </td>
                  </tr>
                  <input
                    className="d-none"
                    defaultValue={x.id ?? ""}
                    {...register(`Items.${index}.id`)}
                  />
                </div>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Row></Row>
    </>
  );
};

export default RefsList;
