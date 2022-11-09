// import LoadingTable from "@componentsLocal/Loading/Table";
import { sleep, toBoolean } from "@utils";
// import { ErrorMessage } from "components/ErrorMessage";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";
import { useRef } from "react";
import { Plus, Trash2 } from "react-feather";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { Button, Table } from "reactstrap";
import CustomFormInput from "@Component/Form/CustomFormInput";
import { parseNumber } from "../../../../utility/Utils";
// import CustomFormNumberInputV2 from "@Component/Form/CustomFormNumberInputV2";
// import { BaseOnOptionsPaymentTermTemplate } from "../../../FixedOptions";
const WIDTHS = ["5%", "15%", "15%", "15%",'15%', "15%", "15%", "10%"];

const DetailsList = ({ loading }) => {
  const ref = useRef();
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
    name: "PaymentTermInfo",
  });
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function addMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() + numOfMonths);

    return date;
  }
  var date = new Date();

const SetDate=()=>{
  
  if (getValues("BasedOn") == "After Invoice Date"){
    console.log("Hello")
    setValue(
      "DueDate",
      date.addDays(
        getValues().PaymentTermInfo.reduce(
          (sum, x, currIndex) => parseNumber(x.CreditDays),
          0
        )
      )
    );
  }else{
    console.log("Jello");
// setValue(
//   "DueDate",
//   addMonths(
//     getValues().PaymentTermInfo.reduce(
//       (sum, x, currIndex) => parseNumber(x.DueDate1),
//       0
//     ),
//     date
//   )
// );
setValue('DueDate',"11-11-2022")
  }
}
  return (
    <>
      <h5 className="mb-1 text-center">Details</h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: WIDTHS[0] }}>#</th>
              <th style={{ width: WIDTHS[1] }}>Based On</th>
              <th style={{ width: WIDTHS[2] }}>Portions</th>
              <th style={{ width: WIDTHS[3] }}>DueDate</th>
              <th style={{ width: WIDTHS[5] }}>Description</th>
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
                      <td style={{ width: WIDTHS[2] }}>
                        <CustomFormSelect
                          className="d-flex"
                          menuPosition={"fixed"}
                          menuShouldBlockScroll
                          hiddenTitle
                          autoFocus={index === fields.length - 1}
                          name={`PaymentTermInfo.${index}.BasedOn`}
                          options={[
                            {
                              value: true,
                              label: "After Invoice Date",
                            },
                            {
                              value: false,
                              label: "After Invoice Month",
                            },
                          ]}
                        />
                      </td>
                      <td className="d-flex">
                        <CustomFormNumberInput
                          style={{ marginTop: "10px" }}
                          hiddenTitle
                          MAX={100}
                          name={`PaymentTermInfo.${index}.Portion`}
                        />
                      </td>

                      <td style={{ width: WIDTHS[3] }}>
                        <CustomFormNumberInput
                          extraOnChangeFun={SetDate}
                          hiddenTitle
                          name={`PaymentTermInfo.${index}.CreditDays`}
                        />
                      </td>

                      <td style={{ width: WIDTHS[4] }}>
                        <CustomFormInput
                          menuPosition="fixed"
                          menuShouldBlockScroll
                          hiddenTitle
                          name={`PaymentTermInfo.${index}.Description`}
                        />
                      </td>

                      <td style={{ width: WIDTHS[6] }}>
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
                      <input
                        type="date"
                        className="d-none"
                        name={`PaymentTermInfo.${index}.DueDate`}
                        // {...register(`PaymentTermInfo.${index}.DueDate`)}
                      />
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
          {/* <ErrorMessage error={errors[`PaymentTermInfo`]?.message} /> */}
          <ul>
            {Array.isArray(errors[`PaymentTermInfo`]) &&
              errors[`PaymentTermInfo`].map((x, i) =>
                Object.keys(x)?.map((e) => (
                  <li>
                    {" "}
                    {/* <ErrorMessage
                      arrayName="PaymentTermInfo"
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
