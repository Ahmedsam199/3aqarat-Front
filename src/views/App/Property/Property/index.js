import { SuccessToast } from "@Component/SuccessToast";
import Breadcrumbs from "@components/breadcrumbs";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MultiRangeSlider from "../../../../components/Form/MultiRange";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";

import { Property as createColumns } from "@columns";
import CustomTable from "@Component/CustomTable";
import { AbilityContext } from "@src/utility/context/Can";
import { deleteItem } from "@store/actions/data";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "../../../../components/CustomSelect";
import CustomFormInputCheckbox from "../../../../components/Form/CustomFormInputCheckbox";
import { arrToHashMap } from "../../../../utility/Utils";
const Index = () => {
  const { t } = useTranslation();
  const {
    Property,
    Territory,
    Purpose,
    tempData: { network },
  } = useSelector((state) => state);
const TerritoryMap=useMemo(()=>arrToHashMap(Territory),[Territory])
const PurposeMap = useMemo(() => arrToHashMap(Purpose), [Purpose]);
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const [currentRow, setCurrentRow] = useState(undefined);
  const toggleFunc = useRef(null);
  // Check how the Smaller is done if you want to Make it in Other File
  const [filters, setFilters] = useState({
    Series: {
      value: "",
      op: "like",
    },
    RequestedAmt: {
      value: "",
      op: "Greater",
    },
    RequestedAmt2: {
      ForValue: "RequestedAmt2",
      value: "",
      op: "Smaller",
    },
    Territory: {
      value: "",
      op: "like",
    },
    Show:{
      value: "",
      op: "like",
    }
  });
  const navigate = useNavigate();
  const ref = useRef();

  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: { value: _filter, op: prev[key].op } };
    });
  };

  const onDelete = async (Series) => {
    dispatch(deleteItem("Property", Series))
      .then((res) => {
        toast.success("Item " + Series + " has been Deleted");
      })
      .catch((err) => {
        console.log("hacker_it_error", err);
        toast.error(err.response.data.message);
      });
  };
  const Columns = createColumns({
    onDelete,
TerritoryMap,
PurposeMap,
    onEdit: (row) =>
      navigate(`/Properties/Property/Update/${row?.Series}`),
  });

  return (
    <div className="w-100">
      <br></br>
      <Card>
        <CardBody>
          <div className="w-100 d-flex justify-content-between">
            <div className="flex-grow-1"></div>
            {ability.can("create", "DT-8") && (
              <div>
                <Link to="/Properties/Property/New">
                  <Button.Ripple color="primary">{t("New")}</Button.Ripple>
                </Link>
              </div>
            )}
          </div>
          <Row>
            
              <Row className="d-flex">
                <Col md="4">
                  <Label>{t("Series")}</Label>
                  <Input
                    placeholder={t("Series")}
                    onChange={(e) =>
                      handleFiltersChange("Series", e.target.value)
                    }
                  />
                </Col>
                <Col md="4">
                  <Label>{t("From")}</Label>
                  <Input
                    placeholder={t("RequestedAmt")}
                    onChange={(e) =>
                      handleFiltersChange("RequestedAmt", e.target.value)
                    }
                  />
                </Col>
                <Col md="4">
                  <Label>{t("To")}</Label>
                  <Input
                    placeholder={t("RequestedAmt")}
                    onChange={(e) =>
                      handleFiltersChange("RequestedAmt2", e.target.value)
                    }
                  />
                </Col>
                <Col md="4">
                  <Label>{t("Territory")}</Label>
                  <CustomSelect
                    isClearable={true}
                    valueName="Series"
                    textName="Territory"
                    value={filters.Territory.value}
                    options={Territory}
                    onChange={(e) => {
                      handleFiltersChange("Territory", e?.value ?? null);
                    }}
                  />
                </Col>
                
                {/* <Col md="4">
                  <Label>{t("Show")}</Label>
                  <Input
                    type="checkbox"
                    placeholder={t("Show")}
                    onChange={(e) =>
                      // handleFiltersChange("Show", e.target.value);
                      console.log(e.target)
                    }
                  />
                </Col> */}
              </Row>
            
          </Row>
        </CardBody>

        <CustomTable
          ref={ref}
          offlineData={Property}
          filters={filters}
          columns={Columns}
        />
      </Card>
    </div>
  );
};
export default Index;
