import { SuccessToast } from "@Component/SuccessToast";
import Breadcrumbs from "@components/breadcrumbs";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useContext } from "react";
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
const Index = () => {
  const { t } = useTranslation();
  const {
    Property,
    tempData: { network },
  } = useSelector((state) => state);
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
    onEdit: (row) =>
      navigate(`/Properties/Property/Update/${row?.Series}`),
  });

  return (
    <div className="w-100">
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
      <br></br>
      <Card>
        <CardBody>
          <Row>
            <Col md="8 ">
              <Row className="d-flex">
                <Col sm="6">
                  <Label>{t("Series")}</Label>
                  <Input
                    placeholder={t("Series")}
                    onChange={(e) =>
                      handleFiltersChange("Series", e.target.value)
                    }
                  />
                </Col>
                <Col sm="6">
                  <Label>{t("From")}</Label>
                  <Input
                    placeholder={t("RequestedAmt")}
                    onChange={(e) =>
                      handleFiltersChange("RequestedAmt", e.target.value)
                    }
                  />
                </Col>
                <Col sm="6">
                  <Label>{t("To")}</Label>
                  <Input
                    placeholder={t("RequestedAmt")}
                    onChange={(e) =>
                      handleFiltersChange("RequestedAmt2", e.target.value)
                    }
                  />
                </Col>
              </Row>
            </Col>
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
