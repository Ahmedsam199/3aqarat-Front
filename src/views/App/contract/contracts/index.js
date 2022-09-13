import { SuccessToast } from "@Component/SuccessToast";
import Breadcrumbs from "@components/breadcrumbs";
import { useContext, useMemo } from "react";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { Link, useNavigate } from "react-router-dom";

import { Contract as createColumns } from "@columns";
import CustomSelect from "@Component/CustomSelect";
import CustomTable from "@Component/CustomTable";
import { PartyTypeOptions } from "@FixedOptions";
import { AbilityContext } from "@src/utility/context/Can";
import { deleteItem } from "@store/actions/data";
import { useRef, useState } from "react";
import { AlertCircle } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const Index = () => {
  const { t } = useTranslation();
  const {
    Contracts,

    Offline: { Contracts: OfflineContract },
    tempData: { network },
  } = useSelector((state) => state);
    const ability = useContext(AbilityContext);
    const dispatch = useDispatch();
    const [currentRow, setCurrentRow] = useState(undefined);
    const toggleFunc = useRef(null);
    const [filters, setFilters] = useState({
      Series: {
        value: "",
        op: "like",
      },
      Attributes: {
        value: "",
        op: "like",
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

  const onDelete = async (Series,ID) => {
    dispatch(deleteItem("Contracts", network ? Series : ID))
      .then((res) => {
                network
                  ? toast.success("Item " + Series + " has been Deleted")
                  : toast.success("Item " + ID + " has been Deleted");
      })
      .catch((err) => {
        console.log("hacker_it_error", err);
        toast.error(err.response.data.message);
      });
  };
  const Columns = createColumns({
    onDelete,
    onEdit: (row) =>
      navigate(
        `/Contract/UpdateContract/${network ? row?.Series : row.ID}`
      ),
  });


  return (
    <div className="w-100">
      <div className="w-100 d-flex justify-content-between">
        <div className="flex-grow-1"></div>

        {ability.can("create", "DT-2") && (
          <div>
            <Link to="/Contract/NewContract">
              <Button.Ripple color="primary">{t("New")}</Button.Ripple>
            </Link>
          </div>
        )}
      </div>
      <br></br>
      <Card>
        <CardBody>
          <Row>
            <Col md="2">
              <FormGroup>
                <Label>{t("Series")}</Label>
                <Input
                  placeholder={t("Series")}
                  onChange={(e) =>
                    handleFiltersChange("Series", e.target.value)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>

        <CustomTable
          ref={ref}
          offlineData={network ? Contracts : OfflineContract}
          filters={filters}
          columns={Columns}
        />
      </Card>
    </div>
  );
};
export default Index;
