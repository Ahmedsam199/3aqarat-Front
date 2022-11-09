import CustomTableV2 from "@Component/Report/CustomTableV2";
import Breadcrumbs from "@components/breadcrumbs";
import { PrintReport } from "@Print";
import Routes from "@Routes";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CustomFormInput from "@Component/Form/CustomFormInput";
import CustomFormInputCheckbox from "@Component/Form/CustomFormInputCheckbox";
import CustomFormNumberInput from "@Component/Form/CustomFormNumberInput";
import CustomFormSelect from "@Component/Form/CustomFormSelect";

import { toasty } from "@toast";
import { addMonths, checkDateValue, removeNullValue, subMonths } from "@utils";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

import CustomSelectV2 from "../../../../components/CustomSelectV2";
import { useSelector } from "react-redux";

import { exportToCsv as exportToExcel } from "@utility/excel";
import { exportToPdf } from "@utility/pdf";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { Search } from "react-feather";
// import CustomFormInputCheckbox from "../../../../components/Form/CustomFormInputCheckbox";
const Index = () => {
  const { Purpose, Lawyer, Property } = useSelector((state) => state);
  const ref = useRef();
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    FormData:null,
    ToDate:null,
ReceiveParty:null,
PayParty:null,
    ContractType: null,
    Currency:null
    
  });
  const {
    ContractType,
    Territory,
    PropertyType,
    Party,
    PaymentType,
    Currency,
  } = useSelector((state) => state);
  const handleFiltersChange = (key, value) => {
    setFilters((prev) => {
      if (Array.isArray(key))
        return {
          ...prev,
          ...Object.assign({}, ...key.map((x, i) => ({ [x]: value[i] }))),
        };
      else return { ...prev, [key]: value };
    });
  };
  const handlePrint = () => {
    const data = ref.current.getData();
    data.length
      ? PrintReport({ data, filters, title: "Property Report" })
      : toasty({ type: "warning", msg: "data empty" });
  };
  const handleExcel = () => {
    const data = ref.current.getData();
    data.length
      ? exportToExcel({
          data: [[checkDateValue(removeNullValue(filters))], data],
          fileName: "Property Report",
          SheetNames: ["Property Report"],
          isMutlSheets: false,
          isTwoTable: true,
        })
      : toasty({ type: "warning", msg: "data empty" });
  };
  const handlePdf = () => {
    const data = ref.current.getData();
    data.length
      ? exportToPdf({
          data: data,
          filters: checkDateValue(removeNullValue(filters)),
          title: "Property Report",
        })
      : toasty({ type: "warning", msg: "data empty" });
  };
  const clearBaseOnValue = () => {
    handleFiltersChange(["Item", "ItemGroup"], [null, null]);
  };
  useEffect(() => {
    clearBaseOnValue();
  }, [filters.BasedOn]);
  return (
    <>
      <div className="row align-items-center">
        <div className="col-9">
          <Breadcrumbs
            breadCrumbTitle="Property Report"
            breadCrumbParent="Reports"
            breadCrumbActive="Property Report"
          />
        </div>
        <div className="col-3 d-flex justify-content-around align-items-center">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="primary" caret>
              {t("Export")}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="a" onClick={handleExcel}>
                {t("as_excel")}
              </DropdownItem>
              <DropdownItem tag="a" onClick={handlePdf}>
                {t("as_pdf")}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Button.Ripple color="primary" onClick={handlePrint}>
            {t("Print")}
          </Button.Ripple>
        </div>
      </div>
      <Card>
        <CardBody>
          <Row></Row>
          <Row className="mt-1">
            <Col sm="4">
              <Label>{t("From Date")}</Label>

              <Flatpickr
                className="form-control"
                data-enable-time
                options={{ dateFormat: "m/d/Y H:i", enableTime: true }}
                value={filters.ContractStarts}
                onChange={(val) => {
                  handleFiltersChange("FromDate", val);
                }}
              />
            </Col>
            <Col sm="4">
              <Label>{t("To Date")}</Label>

              <Flatpickr
                className="form-control"
                data-enable-time
                options={{ dateFormat: "m/d/Y H:i", enableTime: true }}
                value={filters.ContractStarts}
                onChange={(val) => {
                  handleFiltersChange("ToDate", val);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <Label>ContractType</Label>
              <CustomSelectV2
                isClearable={true}
                textName="ContractType"
                valueName="Series"
                value={filters.ContractType}
                options={ContractType}
                onChange={(e) =>
                  handleFiltersChange("ContractType", e?.value ?? null)
                }
              />
            </Col>
            <Col sm="4">
              <Label>Receive Party</Label>
              <CustomSelectV2
                isClearable={true}
                textName="FullName"
                valueName="Series"
                value={filters.ReceiveParty}
                options={Party}
                onChange={(e) =>
                  handleFiltersChange("ReceiveParty", e?.value ?? null)
                }
              />
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <Label>Pay Party</Label>
              <CustomSelectV2
                isClearable={true}
                textName="FullName"
                valueName="Series"
                value={filters.PayParty}
                options={Party}
                onChange={(e) =>
                  handleFiltersChange("PayParty", e?.value ?? null)
                }
              />
            </Col>
            <Col sm="4">
              <Label>Currency</Label>
              <CustomSelectV2
                isClearable={true}
                textName="CurrencyName"
                valueName="Series"
                value={filters.Currency}
                options={Currency}
                onChange={(e) =>
                  handleFiltersChange("Currency", e?.value ?? null)
                }
              />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col sm="3">
              <Button color="primary" onClick={() => ref.current.filter()}>
                Search <Search size={21} />{" "}
              </Button>
            </Col>
          </Row>
          <CustomTableV2
            ref={ref}
            url={Routes.Report.Payment_Report}
            filters={filters}
            ignoreTotalKeys={["id"]}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Index;
