import { UOM as createColumns } from "@columns";
import Breadcrumbs from "@components/breadcrumbs";
import { AbilityContext } from "@src/utility/context/Can";
import { deleteItem } from "@store/actions/data";
import { toasty } from "@toast";
import CustomTable from "@Component/CustomTable";
import React, { useContext, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Map, Marker } from "pigeon-maps";
import {DollarSign, Home, TrendingUp, User} from 'react-feather'


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

import { Link } from "react-router-dom";
const Index = () => {
  const { t } = useTranslation();
  const { UOM } = useSelector((state) => state);
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
      <Card>
        <CardBody>
          {" "}
          <Row>
            <Col>
              <TrendingUp />
              Rented<br></br>122
            </Col>

            <Col>
              <DollarSign />
              Sold<br></br>122
            </Col>
            <Col>
              <User />
              Customers<br></br>122
            </Col>
            <Col>
              <Home />
              Property<br></br>122
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  Total Rent<br></br>100IQD
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  Total Sales<br></br>200IQD
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
        <hr></hr>
        <Map height={300} defaultCenter={[36.1901, 43.993]} defaultZoom={11}>
          <Marker width={50} anchor={[36.1901, 43.993]} />
        </Map>
        <hr></hr>
        <CustomTable
          ref={ref}
          offlineData={UOM}
          columns={Columns}
          filters={filters}
        />
      </Card>
    </>
  );
};

export default Index;
