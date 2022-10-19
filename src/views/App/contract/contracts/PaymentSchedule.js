// Joseph : Look at findRate functino please
import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { sleep, toBoolean } from "@utils";
import { useRef } from "react";
import { Plus, Trash2 } from "react-feather";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, Col, Row, Table } from "reactstrap";
const RefsList = ({
  loading,
   fieldspaymentschedualinfo,
   appendpaymentschedualinfo,
   removepaymentschedualinfo,
   Replacepaymentschedualinfo,
}) => {
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
  
  return (
    <>
      <h5 className="">{t("paymentschedualinfo")}</h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>{t("BasedOn")}</th>
              <th style={{ width: "25%" }}>{t("Portion")}</th>
              <th style={{ width: "25%" }}>{t("DueDate")}</th>
              <th style={{ width: "25%" }}>{t("Amount")}</th>
              <th style={{ width: "25%" }}>{t("Description")}</th>
            </tr>
          </thead>
          <tbody {...{ ref }}>
            {fieldspaymentschedualinfo.map((x, index) => {
              return (
                <div key={x.id}>
                  <tr className="d-flex">
                    <th style={{ width: "5%" }} scope="row">
                      {index + 1}
                    </th>

                    <td style={{ width: "21%" }}>
                      <CustomFormInput
                        IsDisabled={true}
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={
                          index === fieldspaymentschedualinfo.length - 1
                        }
                        hiddenTitle
                        name={`paymentschedualinfo.${index}.BasedOn`}
                      />
                    </td>
                    <td style={{ width: "21%" }}>
                      <CustomFormInput
                        IsDisabled={true}
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={
                          index === fieldspaymentschedualinfo.length - 1
                        }
                        hiddenTitle
                        name={`paymentschedualinfo.${index}.Portion,`}
                      />
                    </td>
                    <td style={{ width: "21%" }}>
                      <CustomFormInput
                        type="date"
                        IsDisabled={true}
                        name={`paymentschedualinfo.${index}.DueDate`}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: "21%" }}>
                      <CustomFormNumberInput
                        IsDisabled={true}
                        name={`paymentschedualinfo.${index}.Amount`}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: "21%" }}>
                      <CustomFormInput
                        IsDisabled={true}
                        menuPosition={"fixed"}
                        menuShouldBlockScroll
                        autoFocus={
                          index === fieldspaymentschedualinfo.length - 1
                        }
                        hiddenTitle
                        name={`paymentschedualinfo.${index}.Description`}
                      />
                    </td>
                    {/* <td style={{ width: "10%" }}>
                      <Button.Ripple
                        className="btn-icon"
                        color="flat-danger"
                        onClick={async () => {
                          await Promise.all([remove(index)]);
                        }}
                      >
                        <Trash2 size="15" />
                      </Button.Ripple>
                    </td> */}
                  </tr>
                  <input
                    className="d-none"
                    defaultValue={x.id ?? ""}
                    {...register(`paymentschedualinfo.${index}.id`)}
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
          {/* {toBoolean(getValues("_write")) && (
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
          )} */}
        </Col>
      </Row>
    </>
  );
};

export default RefsList;
