import CustomTableV2 from "@Component/Report/CustomTableV2";
import Breadcrumbs from "@components/breadcrumbs";
import { PrintReport } from "@Print";
import Routes from "@Routes";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
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
const Index = () => {
  const { Purpose,Lawyer,Property } = useSelector((state) => state);
  const ref = useRef();
  const { t } = useTranslation();

  const [filters, setFilters] = useState({
    From_Date: [subMonths(new Date(), 1)],
    To_Date: [addMonths(new Date(), 1)],
    BasedOn: 0,
  });
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
      ? PrintReport({ data, filters, title: "Lawyers" })
      : toasty({ type: "warning", msg: "data empty" });
  };
  const handleExcel = () => {
    const data = ref.current.getData();
    data.length
      ? exportToExcel({
          data: [[checkDateValue(removeNullValue(filters))], data],
          fileName: "Lawyers",
          SheetNames: ["Lawyers"],
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
          title: "Lawyers",
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
            breadCrumbTitle="Lawyers"
            breadCrumbParent="Reports"
            breadCrumbActive="Lawyers"
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
          <Row>
            {/* <Col md="4">
              <Label>{t("Contract Starts")}</Label>

              <Flatpickr
                className="form-control"
                data-enable-time
                options={{ dateFormat: "m/d/Y H:i", enableTime: true }}
                value={filters.ContractStarts}
                onChange={(val) => {
                  handleFiltersChange("ContractStarts", val);
                }}
              />
            </Col>
             */}
            {/* <Col md="4">
              <Label>{t("To Date")}:</Label>
              <Flatpickr
                className="form-control"
                data-enable-time
                options={{ dateFormat: "m/d/Y H:i", enableTime: true }}
                value={filters.To_Date}
                onChange={(val) => () => {
                  handleFiltersChange("Contract Ends", val);
                }}
              />
            </Col> */}
            {/* <Col md="2">
              <FormGroup>
                <Label for="BasedOn">
                  <FormattedMessage>{t("BasedOn")}</FormattedMessage>:
                </Label>
                <CustomSelect
                  isClearable
                  value={filters.BasedOn}
                  textName="label"
                  valueName="value"
                  options={[
                    { label: "Item", value: 1 },
                    { label: "ItemGroup", value: 2 },
                  ]}
                  onChange={(e) => {
                    handleFiltersChange("BasedOn", e?.value ?? null);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage>{t("Item")}</FormattedMessage>:
                </Label>

                <CustomSelectV2
                  isClearable={true}
                  customName="Barcode"
                  isDisabled={filters.BasedOn == 2}
                  customValue="Barcode"
                  textName="ItemName"
                  customName2="ItemCode"
                  customValue2="ItemCode"
                  valueName="Series"
                  value={filters.Item}
                  options={Item}
                  onChange={(e) =>
                    handleFiltersChange("Item", e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage>{t("ItemGroup")}</FormattedMessage>:
                </Label>
                <CustomSelectV2
                  isDisabled={filters.BasedOn == 1}
                  isClearable={true}
                  textName="ItemGroupName"
                  valueName="Series"
                  value={filters.ItemGroup}
                  options={ItemGroup}
                  onChange={(e) =>
                    handleFiltersChange("ItemGroup", e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage>{t("Users")}</FormattedMessage>:
                </Label>
                <CustomSelectV2
                  isClearable={true}
                  textName="FullName"
                  valueName="Series"
                  value={filters.User}
                  options={Users}
                  onChange={(e) =>
                    handleFiltersChange("User", e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col> */}
            {/* <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Customers" />:
                </Label>
                <CustomSelectV2
                  isClearable={true}
                  textName="PartyName"
                  valueName="Series"
                  value={filters.Party}
                  options={Customer}
                  onChange={(e) =>
                    handleFiltersChange("Party", e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col> */}
            {/* <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Series" />:
                </Label>
                <Input
                  name="Series"
                  id="Series"
                  onChange={(e) => {
                    sleep(500).then(() =>
                      handleFiltersChange("Series", e.target.value ?? "")
                    );
                    // handleFiltersChange('AffectedSeries', e.target.value ?? "")
                  }}
                />
              </FormGroup>
            </Col>*/}

            <Col sm="4">
              <Label>Lawyer Name</Label>
              <CustomSelectV2
                isClearable={true}
                textName="FullName"
                valueName="FullName"
                value={filters.Lawyer}
                options={Lawyer}
                onChange={(e) =>
                  handleFiltersChange("Lawyer", e?.value ?? null)
                }
              />
            </Col>
            <Col sm="4">
              <Label>Phone</Label>
              <Input
                value={filters.Phone}
                onChange={(e) =>
                  handleFiltersChange("Phone", e.target.value ?? "")
                }
              />
            </Col>
            {/* <Col sm="4">
              <Label>Property</Label>
              <CustomSelectV2
                isClearable={true}
                textName="Series"
                valueName="Series"
                value={filters.Property}
                options={Property}
                onChange={(e) =>
                  handleFiltersChange("Lawyer", e?.value ?? null)
                }
              />
            </Col> */}
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
            url={Routes.Report.Lawyer_Report}
            filters={filters}
            ignoreTotalKeys={["id"]}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Index;
