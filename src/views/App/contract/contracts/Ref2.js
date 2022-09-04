// Joseph : Look at findRate functino please
import { useSelector } from "react-redux";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormInput from "@Component/Form/CustomFormInput";
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
    const {

      Currency,



    } = useSelector((state) => state);
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Furniture",
  });
    let CurrencyOpt = [];
  Currency.forEach((x) => {
    CurrencyOpt.push({
      value: x.Series,
      label: x.Series + " " + x.CurrencyName,
    })})
  return (
    <>
      <h5 className="mb-1 text-center">{t("Furniture")}</h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: "30%" }}>{t("Subject")}</th>
              <th style={{ width: "25%" }}>{t("Statue")}</th>
              <th style={{ width: "25%" }}>{t("Price")}</th>
              <th style={{ width: "25%" }}>{t("Currency")}</th>
              <th style={{ width: "25%" }}>{t("Qty")}</th>
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
                      <CustomFormInput hiddenTitle name={`Subject`} />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormSelect
                        name={`Statue`}
                        options={[
                          { value: 0, label: "Brand New" },
                          { value: 1, label: "Very Good" },
                          { value: 2, label: "Good" },
                          { value: 3, label: "Acceptable" },
                          { value: 4, label: "Bad" },
                          { value: 5, label: "Poor" },
                        ]}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormInput  name={`Price`} hiddenTitle />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormSelect
                        name={`Currency`}
                        options={CurrencyOpt}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormInput name={`Qty`} hiddenTitle />
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
                    {...register(`Items.${index}.id`)}
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
