import { UOM as createColumns } from "@columns";
import Breadcrumbs from "@components/breadcrumbs";
import { AbilityContext } from "@src/utility/context/Can";
import { deleteItem } from "@store/actions/data";
import { toasty } from "@toast";
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
import { Link } from "react-router-dom";
const Index = () => {
  const { t } = useTranslation();
  const { Contract_Payment } = useSelector((state) => state);
  const ability = useContext(AbilityContext);
  const dispatch = useDispatch();
  const [currentRow, setCurrentRow] = useState(undefined);
  const toggleFunc = useRef(null);
  const [filters, setFilters] = useState({
    Series: {
      value: "",
      op: "like",
    },
    UOM: {
      value: "",
      op: "like",
    },
    ConverstionFactor: {
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
    dispatch(deleteItem("UOM", Series))
      .then((res) => {
        ref.current?.refresh();
        toasty({ type: "success", msg: "Delete Successfully!" });
      })
      .catch((err) => {
        console.log("hacker_it_error", err);
      });
  };

  const Columns = useMemo(
    () => createColumns({ onDelete, onEdit: (row) => setCurrentRow(row) }),
    []
  );
  return (
    <>
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1"></div>
        {ability.can("create", "DT-13") && (
          <div>
            <Link
              className="btn btn-primary mb-2"
              to="/App/Contract/Payment/new"
              color="primary"
            >
              {t("New")}
            </Link>
          </div>
        )}
      </div>
      <Card>
        <CardBody>
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
                <Label>{t("UOM")}</Label>
                <Input
                  placeholder={t("ConverstionFactor")}
                  onChange={(e) => handleFiltersChange("UOM", e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          offlineData={Contract_Payment}
          columns={Columns}
          filters={filters}
        />
      </Card>
    </>
  );
};

export default Index;
