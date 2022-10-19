// Joseph : Look at findRate functino please

import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { sleep, toBoolean } from "@utils";
import { useRef } from "react";
import { Plus, Trash2 } from "react-feather";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
    name: "ExtraPayment",
  });
  const { PaymentTypes, Currency, Party } = useSelector((state) => state);
  return (
    <>
      <h5 className="">{t("ExtraPayment")}</h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>{t("PaymentType")}</th>
              <th style={{ width: "25%" }}>{t("FromParty")}</th>
              <th style={{ width: "25%" }}>{t("ToParty")}</th>
              <th style={{ width: "25%" }}>{t("Amount")}</th>
              <th style={{ width: "25%" }}>{t("PaidCurrency")}</th>
            </tr>
          </thead>
          <tbody {...{ ref }}>
            {fields.map((x, index) => {
              return (
                <div key={x.id}>
                  <tr className="d-flex">
                    <th style={{ width: "5%" }} scope="row">
                      {index + 1}
                    </th>
                    <td style={{ width: "21%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        textName="PaymentType"
                        valueName="Series"
                        options={PaymentTypes}
                        name={`ExtraPayment.${index}.PaymentType`}
                      />
                    </td>
                    <td style={{ width: "21%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        name={`ExtraPayment.${index}.FromParty`}
                        options={Party}
                        valueName="Series"
                        textName="FullName"
                      />
                    </td>
                    <td style={{ width: "21%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        name={`ExtraPayment.${index}.ToParty`}
                        options={Party}
                        valueName="Series"
                        textName="FullName"
                      />
                    </td>
                    <td style={{ width: "21%" }}>
                      <CustomFormNumberInput
                        name={`ExtraPayment.${index}.Amount`}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: "21%" }}>
                      <CustomFormSelect
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        options={Currency}
                        valueName="Series"
                        textName="CurrencyName"
                        name={`ExtraPayment.${index}.PaidCurrency`}
                      />
                    </td>
                    <td style={{ width: "10%" }}>
                      <Button.Ripple
                        className="btn-icon"
                        color="flat-danger"
                        onClick={async () => {
                          await Promise.all([remove(index)]);
                        }}
                      >
                        <Trash2 size="15" />
                      </Button.Ripple>
                    </td>
                  </tr>
                  <input
                    className="d-none"
                    defaultValue={x.id ?? ""}
                    {...register(`ExtraPayment.${index}.id`)}
                  />
                  <input
                    className="d-none"
                    {...register(`contractSeries.${index}.id`)}
                  />
                </div>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Row>
        <Col>
          <small className="my-1 text-danger d-block">
            <ul>
              {Array.isArray(errors[`priceListCountries`]) &&
                errors[`priceListCountries`].map((x, i) =>
                  Object.keys(x)?.map((e) => <li> </li>)
                )}
            </ul>
          </small>
          {toBoolean(getValues("_write")) && (
            <Button
              className="btn-icon"
              color="success"
              onClick={() => {
                append({});
                // wait until add the row then scroll to down
                // sleep(100).then(
                //   () => (ref.current.scrollTop = ref.current.scrollHeight)
                // );
              }}
            >
              <Plus size={14} />
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default RefsList;
