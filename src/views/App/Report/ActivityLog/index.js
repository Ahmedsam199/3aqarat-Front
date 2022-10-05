import CustomTable from "@Component/Report/CustomTable";
// import CustomTableV1 from "@Component/Report/CustomTableV2";
import Breadcrumbs from "@components/breadcrumbs";
import { PrintReport } from "@Print";
import Routes from "@Routes";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toasty } from "@toast";
import { addMonths, checkDateValue, removeNullValue, subMonths } from "@utils";

import {Doctype} from '@FixedOptions'
import { exportToCsv as exportToExcel } from "@utility/excel";
import { exportToPdf } from "@utility/pdf";
import { useEffect, useMemo, useRef, useState } from "react";
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
  Label,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

import { Info, Search } from "react-feather";
import { FormattedMessage } from "react-intl";
import POST from './post'
import CustomSelect from "../../../../components/CustomSelect";
import { useSelector } from "react-redux";
const Index = () => {
  // const Doctypes = useData('Doctypes');
  // const Users = useData('Users');
  // const ability = useContext(AbilityContext);
  // const dispatch = useDispatch();
  const [currentRow, setCurrentRow] = useState(undefined);
  const [filters, setFilters] = useState({
    ContractStarts: [subMonths(new Date(), 1)],
    ContractEnds: [addMonths(new Date(), 1)],
    ActionType: 99,
    Doctype: 0,
    User: 0,
  });
  const { User } = useSelector((state) => state);
  
  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: _filter };
    });
  };
  const toggleFunc = useRef(null);
  // const { formatMessage } = useIntl();
  const ref = useRef();
  const customColumn = useMemo(() => {
    return [
      // {
      //   name: <FormattedMessage  />,
      //   minWidth: "10%",
      //   museIntlaxWidth: "10%",
      //   cell: (row) => (
      //     <FormattedMessage
      //       id={ActivityTypes.find((x) => x.value == row.ActivityType).label}
      //     />
      //   ),
      // },
      {

        cell: (row) => (
          <Button
            className="mr-1 btn-icon"
            color="flat-info"
            onClick={() => {
              setCurrentRow(row);
            }}
          >
            <Info size="15" />
          </Button>
        ),
      },
    ];
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <Breadcrumbs
            breadCrumbTitle="Activity Log"
            breadCrumbParent="Reports"
            breadCrumbActive="Activity Log"
          />
        </div>
      </div>
      <Card>
        <CardBody>
          {/* <Row form className="mt-1 mb-50">
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Start Date" />:
                </Label>
                <Flatpickr
                  className="form-control"
                  value={filters.StartDate}
                  onChange={(val) => handleFiltersChange("StartDate", val)}
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="End Date" />:
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{ dateFormat: "m/d/Y" }}
                  value={filters.EndDate}
                  onChange={(val) => handleFiltersChange("EndDate", val)}
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Doctype" />:
                </Label>
                <CustomSelect
                  menuPosition="fixed"
                  menuShouldBlockScroll
                  isClearable={true}
                  textName="DocTypeName"
                  valueName="Series"
                  value={filters.Doctype}
                  options={Doctypes}
                  onChange={(e) =>
                    handleFiltersChange("Doctype", e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="User" />:
                </Label>
                <CustomSelect
                  menuPosition="fixed"
                  menuShouldBlockScroll
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
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Activity Type" />:
                </Label>
                <CustomSelect
                  menuPosition="fixed"
                  menuShouldBlockScroll
                  isClearable={true}
                  textName="label"
                  valueName="value"
                  value={filters.ActivityType}
                  options={ActivityTypes}
                  onChange={(e) =>
                    handleFiltersChange("ActivityType", e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="AffectedSeries" />:
                </Label>
                <Input
                  name="AffectedSeries"
                  id="AffectedSeries"
                  onChange={(e) => {
                    sleep(500).then(() =>
                      handleFiltersChange(
                        "AffectedSeries",
                        e.target.value ?? ""
                      )
                    );
                    // handleFiltersChange('AffectedSeries', e.target.value ?? "")
                  }}
                />
              </FormGroup>
            </Col>
          </Row> */}
          <Row>
            <Col sm="4">
              <FormGroup>
                <Label>DocType</Label>
                <CustomSelect
                  menuPosition="fixed"
                  menuShouldBlockScroll
                  isClearable={true}
                  textName="DocTypeName"
                  valueName="Series"
                  value={filters.Doctype}
                  options={Doctype}
                  onChange={(e) =>
                    handleFiltersChange("Doctype", e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <FormGroup>
                <Label>ActionType</Label>
                <CustomSelect
                  menuPosition="fixed"
                  menuShouldBlockScroll
                  isClearable={true}
                  value={filters.ActionType}
                  options={[
                    { value: 0, label: "Create" },
                    { value: 1, label: "Update" },

                    { value: 2, label: "Delete" },
                  ]}
                  onChange={(e) =>
                    handleFiltersChange("ActionType", e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col sm="4">
              <Label>User</Label>
              <CustomSelect
                menuPosition="fixed"
                menuShouldBlockScroll
                isClearable={true}
                textName="FullName"
                valueName="UserName"
                value={filters.User}
                onChange={(e) => handleFiltersChange("User", e?.value ?? null)}
                options={User}
              />
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Label>Contract Starts</Label>

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
            <Col md="4">
              <Label>ContractEnds</Label>

              <Flatpickr
                className="form-control"
                data-enable-time
                options={{ dateFormat: "m/d/Y H:i", enableTime: true }}
                value={filters.ContractStarts}
                onChange={(val) => {
                  handleFiltersChange("ContractEnds", val);
                }}
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
        </CardBody>
        <div>
          <POST
            row={currentRow}
            toggleFunc={toggleFunc}
            onToggle={() => setCurrentRow(undefined)}
          />
        </div>
        <CustomTable
          ref={ref}
          url={Routes.Report.ActivityLog}
          customColumn={customColumn}
          ignoreColumn={["ActivityType", "ChangedValues"]}
          filters={filters}
        />
      </Card>
    </>
  );
};

export default Index;
