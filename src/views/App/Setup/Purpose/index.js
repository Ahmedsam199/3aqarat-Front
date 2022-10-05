import { Purpose as createColumns } from "@columns";
import Breadcrumbs from "@components/breadcrumbs";
import { AbilityContext } from "@src/utility/context/Can";
import { deleteItem } from "@store/actions/data";
import { toasty } from "@toast";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import CustomTable from "@Component/CustomTable";
import React, { useContext, useMemo, useRef, useState } from "react";
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
  Row,
} from "reactstrap";
import POST from "./post";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { arrToHashMap } from "../../../../utility/Utils";
const Index = () => {
  const { t } = useTranslation();
  const { Purpose: Purpose,Currency } = useSelector((state) => state);
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const [currentRow, setCurrentRow] = useState(undefined);
  const toggleFunc = useRef(null);
  const [filters, setFilters] = useState({
    Series: {
      value: "",
      op: "like",
    },
    Purpose: {
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
const CurrencyMap = useMemo(() => arrToHashMap(Currency), [Currency]);
  const onDelete = (Series) => {
    dispatch(deleteItem("Purpose", Series))
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
    CurrencyMap,
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
            {ability.can("create", "DT-11") && (
              <div>
                <Button.Ripple
                  className="mb-1"
                  color="primary"
                  onClick={() => toggleFunc.current()}
                >
                  {t("New")}
                </Button.Ripple>
              </div>
            )}
          </div>
          <Row>
            <Col lg="3" md="4">
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
            <Col lg="3" md="4">
              <FormGroup>
                <Label>{t("Purpose")}</Label>
                <Input
                  placeholder={t("Purpose")}
                  onChange={(e) =>
                    handleFiltersChange("Purpose", e.target.value)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          offlineData={Purpose}
          columns={Columns}
          filters={filters}
        />
      </Card>
    </>
  );
};

export default Index;
