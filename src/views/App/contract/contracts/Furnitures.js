// Joseph : Look at findRate functino please
import { useSelector } from "react-redux";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { sleep, toBoolean } from "@utils";
import { useEffect, useRef } from "react";
import { Plus, Trash2 } from "react-feather";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, Button, Col, Label, Row, Table } from "reactstrap";
import { parseNumber } from "../../../../utility/Utils";
const RefsList = ({
  loading,
  fieldsFurnitures,
  appendFurnitures,
  removeFurnitures,
  ReplaceFurniture,
  
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
  const { Currency } = useSelector((state) => state);

  const refreshTotalQty = (_, ignoreIndex) => {
    setValue(
      "TotalQty",
      getValues().Furnitures.reduce(
        (sum, x, currIndex) =>
          sum + parseNumber(x.Qty) * (currIndex !== ignoreIndex),
        0
      )
    );
  };

  const refreshTotalPrice = (_, ignoreIndex) => {
    setValue(
      "TotalPrice",
      getValues().Furnitures.reduce(
        (sum, x, currIndex) =>
          sum +
          parseNumber(x.Qty) *
            parseNumber(x.Price) *
            (currIndex !== ignoreIndex),
        0
      )
    );
  };
  const DoubleChange = () => {
    refreshTotalQty();
    refreshTotalPrice();
  };
  let CurrencyOpt = [];
  Currency.forEach((x) => {
    CurrencyOpt.push({
      value: x.Series,
      label: x.Series + " " + x.CurrencyName,
    });
  });
//   useEffect(()=>{
// DoubleChange()
//   },[setValue])
useEffect(() => {
  if(fieldsFurnitures.length==0){
    setValue("TotalPrice",0)
      setValue("TotalQty", 0);
      
  }else{

    DoubleChange();
  }
}, [fieldsFurnitures]);
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
            {fieldsFurnitures.map((x, index) => {
              
              return (
                <div key={x.id} style={{ overflow: "hidden" }}>
                  <tr className="d-flex">
                    <th style={{ width: "5%" }} scope="row">
                      {index + 1}
                    </th>
                    <td style={{ width: "30%" }}>
                      <CustomFormInput
                        menuShouldBlockScroll
                        hiddenTitle
                        menuPosition="fixed"
                        IsDisabled={true}
                        name={`Furnitures.${index}.Subject`}
                      />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormSelect
                        IsDisabled={true}
                        style={{ overflow: "hidden" }}
                        menuPosition="fixed"
                        menuShouldBlockScroll
                        hiddenTitle
                        autoFocus={index === fieldsFurnitures.length - 1}
                        name={`Furnitures.${index}.Statue`}
                        options={[
                          { value: 0, label: "Brand New" },
                          { value: 1, label: "Very Good" },
                          { value: 2, label: "Good" },
                          { value: 3, label: "Acceptable" },
                          { value: 4, label: "Bad" },
                          { value: 5, label: "Poor" },
                        ]}
                      />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormNumberInput
                        IsDisabled={true}
                        name={`Furnitures.${index}.Price`}
                        hiddenTitle
                        extraOnChangeFun={DoubleChange}
                      />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormSelect
                        IsDisabled={true}
                        name={`Furnitures.${index}.Currency`}
                        options={Currency}
                        textName="CurrencyName"
                        valueName="Series"
                        menuPosition="fixed"
                        menuShouldBlockScroll
                        hiddenTitle
                        autoFocus={index === fieldsFurnitures.length - 1}
                      />
                    </td>
                    <td style={{ width: "25%" }}>
                      <CustomFormNumberInput
                        IsDisabled={true}
                        menuPosition="fixed"
                        name={`Furnitures.${index}.Qty`}
                        extraOnChangeFun={DoubleChange}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: "10%" }}>
                      <Button.Ripple
                        className="btn-icon"
                        color="flat-danger"
                        onClick={async () => {
                          await Promise.all([removeFurnitures(index)]);
                          DoubleChange();
                          refreshTotalPrice();
                        }}
                      >
                        <Trash2 size="15" />
                      </Button.Ripple>
                    </td>
                  </tr>
                  <input
                    className="d-none"
                    defaultValue={x.id ?? ""}
                    {...register(`Furnitures.${index}.id`)}
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
                appendFurnitures({});
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
      <div style={{ width: "100%", display: "flex" }}>
        {/* <Label>Total Price</Label> */}
        
        <CustomFormNumberInput
          
          name="TotalPrice"
          IsDisabled={true}
        />
        
        {/* <Label>Total Qty</Label> */}
        <CustomFormNumberInput  name="TotalQty" IsDisabled={true} />
      </div>
    </>
  );
};

export default RefsList;
