// Joseph : Look at findRate functino please

import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import CustomFormInput from "@Component/Form/CustomFormInput";
import { sleep, toBoolean } from "@utils";
import { useRef } from "react";
import { Plus, Trash2 } from "react-feather";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Col, Row, Table } from "reactstrap";
import { useSelector } from "react-redux";
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
    name: "Attributes",
  });
  const { Property, Party, Territory, Purpose, Currency, PropertyAttr } =
    useSelector((state) => state);
  return (
    <>
      <h5 className="mb-1 text-center">{t("Attributes")}</h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: "50%" }}>{t("Attributes")}</th>
              <th style={{ width: "50%" }}>{t("Value")}</th>
            </tr>
          </thead>
          <tbody {...{ ref }}>
            {fields.map((x, index) => {
              return (
                <div key={x.id}>
                  <tr className="d-flex">
                    <th scope="row">{index + 1}</th>
                    <td style={{ width: "50%" }}>
                      <CustomFormSelect
                        options={PropertyAttr}
                        textName="Attribute"
                        valueName="Attribute"
                        menuPosition="fixed"
                        menuShouldBlockScroll
                        hiddenTitle
                        autoFocus={index === fields.length - 1}
                        name={`Attributes.${index}.Attributes`}
                      />
                    </td>
                    <td style={{ width: "50%" }}>
                      <CustomFormInput
                        hiddenTitle
                        name={`Attributes.${index}.AttributesValue`}
                        menuPosition="fixed"
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                      />
                    </td>

                    <td>
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
                    {...register(`Attributes.${index}.id`)}
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
