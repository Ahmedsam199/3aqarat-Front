import { Territory as createColumns } from "@columns";
import CustomTable from "@Component/CustomTable";
import { AbilityContext } from "@src/utility/context/Can";
import { deleteItem } from "@store/actions/data";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useContext, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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
import POST from "./post";
const Index = () => {
  const { t } = useTranslation();
  const { Territory } = useSelector((state) => state);
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const [currentRow, setCurrentRow] = useState(undefined);
  const toggleFunc = useRef(null);
  const [filters, setFilters] = useState({
    Series: {
      value: "",
      op: "like",
    },
    Territory: {
      value: "",
      op: "like",
    },
  });
  const ref = useRef();

  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: { value: _filter, op: prev[key].op } };
    });
  };

  const onDelete = (Series) => {
    dispatch(deleteItem("Territory", Series))
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
    onEdit: (row) => setCurrentRow(row),
  });
  return (
    <>
      <div className="d-flex justify-content-between align-items-start"></div>
      <Card>
        <div>
          {" "}
          <POST
            row={currentRow}
            toggleFunc={toggleFunc}
            onToggle={() => setCurrentRow(undefined)}
          />
        </div>
        <CardBody>
          <div className="w-100 d-flex justify-content-between">
            <div className="flex-grow-1"></div>
            {ability.can("create", "DT-13") && (
              <div>
                <Button.Ripple
                  color="primary"
                  className="mb-2"
                  onClick={() => toggleFunc.current()}
                >
                  {t("New")}
                </Button.Ripple>
              </div>
            )}
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
              
                <Label>{t("Territory")}</Label>
                <Input
                  placeholder={t("Territory")}
                  onChange={(e) =>
                    handleFiltersChange("Territory", e.target.value)
                  }
                />
              
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          offlineData={Territory}
          columns={Columns}
          filters={filters}
        />
      </Card>
    </>
  );
};

export default Index;
