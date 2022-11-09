import { User as createColumns } from "@columns";
import Breadcrumbs from "@components/breadcrumbs";
import { AbilityContext } from "@src/utility/context/Can";
import { deleteItem } from "@store/actions/data";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import { toasty } from "@toast";
import CustomTable from "@Component/CustomTable";
import React, { useContext, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import POST from "./post";
import { Link } from "react-router-dom";
import { arrToHashMap } from "../../../../utility/Utils";
const Index = () => {
  const { t } = useTranslation();
  const { User } = useSelector((state) => state);
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const [currentRow, setCurrentRow] = useState(undefined);
  const toggleFunc = useRef(null);
    const {
Branches
    } = useSelector((state) => state);
  const [filters, setFilters] = useState({
    Series: {
      value: "",
      op: "like",
    },
    UserName: {
      value: "",
      op: "like",
    },
  });
  const ref = useRef();
const BranchesMap = useMemo(() => arrToHashMap(Branches), [Branches]);
  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: { value: _filter, op: prev[key].op } };
    });
  };

  const onDelete = (Series) => {
    dispatch(deleteItem("User", Series))
      .then((res) => {
        ref.current?.refresh();
        toast.success("Item " + Series + " has been Deleted");
      })
      .catch((err) => {
        console.log("hacker_it_error", err);
        toast.error(err.response.data.message);
      });
  };

  const Columns = createColumns({
    onDelete,
    BranchesMap,
    onEdit: (row) => setCurrentRow(row),
  });
  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
      </div>
      <Card>
        <div>
          <div>
            <POST
              row={currentRow}
              toggleFunc={toggleFunc}
              onToggle={() => setCurrentRow(undefined)}
            />
          </div>
        </div>
        <CardBody>
        <div className="w-100 d-flex justify-content-between">
          <div className="flex-grow-1"></div>
          {/* {ability.can("create", "DT-14") && (
            <div>
              <Button.Ripple
                className="mb-1"
                color="primary"
                onClick={() => toggleFunc.current()}
              >
                {t("New")}
              </Button.Ripple>
            </div>
          )} */}
        </div>
          <Row>
            <Col  md="4">
              
                <Label>{t("Series")}</Label>
                <Input
                  placeholder={t("Series")}
                  onChange={(e) =>
                    handleFiltersChange("Series", e.target.value)
                  }
                />
              
            </Col>
            <Col  md="4">
              
                <Label>{t("UserName")}</Label>
                <Input
                  placeholder={t("UserName")}
                  onChange={(e) =>
                    handleFiltersChange("UserName", e.target.value)
                  }
                />
              
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          offlineData={User}
          columns={Columns}
          filters={filters}
        />
      </Card>
    </>
  );
};

export default Index;
