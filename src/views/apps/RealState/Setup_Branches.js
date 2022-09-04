import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
// ** React Imports
import { useContext, useState, useRef, useEffect } from "react";
import { Button, Input, Label } from "reactstrap";
import * as React from "react";
import { Grid } from "@nextui-org/react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Table, Card } from "reactstrap";
import * as react from 'react'
import {} from "@nextui-org/react";
import {
  Monitor,
  Coffee,
  Watch,
  TrendingUp,
  TrendingDown,
} from "react-feather";
import Avatar from "@components/avatar";
import "../RealState/css.css";
// ** Reactstrap Imports
import { Row, Col } from "reactstrap";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Setup_Branches = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [datas, setData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postPerPage] = useState(5);
  useEffect(() => {
    axios
      .get(`http://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })

      .catch((err) => {
        console.log("failed toffetch");
      });
  }, []);
  const data = [
    {
      name: "Test",

      icon: <Monitor size={18} />,
      category: "Technology",
      views: "23.4k",
      time: "24 hours",
      revenue: "891.2",
      sales: "68",
    },
    {
      img: require("@src/assets/images/icons/parachute.svg").default,
      name: "Motels",
      email: "vecav@hodzi.co.uk",
      icon: <Coffee size={18} />,
      category: "Grocery",
      views: "78k",
      time: "2 days",
      revenue: "668.51",
      sales: "97",
      salesUp: true,
    },
    {
      img: require("@src/assets/images/icons/brush.svg").default,
      name: "Zipcar",
      email: "davcilse@is.gov",
      icon: <Watch size={18} />,
      category: "Fashion",
      views: "162",
      time: "5 days",
      revenue: "522.29",
      sales: "62",
      salesUp: true,
    },
    {
      img: require("@src/assets/images/icons/star.svg").default,
      name: "Owning",
      email: "us@cuhil.gov",
      icon: <Monitor size={18} />,
      category: "Technology",
      views: "214",
      time: "24 hour",
      revenue: "291.01",
      sales: "88",
      salesUp: true,
    },
    {
      img: require("@src/assets/images/icons/book.svg").default,
      name: "Cafés",
      email: "pudais@jife.com",
      icon: <Coffee size={18} />,
      category: "Grocery",
      views: "208",
      time: "1 week",
      revenue: "783.93",
      sales: "16",
    },
    {
      img: require("@src/assets/images/icons/rocket.svg").default,
      name: "Kmart",
      email: "bipri@cawiw.com",
      icon: <Watch size={18} />,
      category: "Fashion",
      views: "990",
      time: "1 month",
      revenue: "780.05",
      sales: "78",
      salesUp: true,
    },
    {
      img: require("@src/assets/images/icons/speaker.svg").default,
      name: "Payers",
      email: "luk@izug.io",
      icon: <Watch size={18} />,
      category: "Fashion",
      views: "12.9k",
      time: "12 hours",
      revenue: "531.49",
      sales: "42",
      salesUp: true,
    },
  ];
  const colorsArr = {
    Technology: "light-primary",
    Grocery: "light-success",
    Fashion: "light-warning",
  };

  const renderData = () => {
    return data.map((col) => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className="text-success" />
      ) : (
        <TrendingDown size={15} className="text-danger" />
      );

      return (
        <tr key={col.name}>
          <td>
            <div className="d-flex align-items-center">
              <div>
                <div className="fw-bolder">{col.name}</div>
                <div className="font-small-2 text-muted">{col.email}</div>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <Avatar
                className="me-1"
                color={colorsArr[col.category]}
                icon={col.icon}
              />
              <span>{col.category}</span>
            </div>
          </td>
          
        </tr>
      );
    });
  };

  return (
    <div className="all">
      <div className="FirstRow">
        <Col>
          <Label>Test</Label>
          <Input bordered Placeholder="Default" color="default" />
        </Col>
        <Col>
          <Label>Test</Label>
          <Input bordered labelPlaceholder="Primary" color="primary" />
        </Col>
        <Col>
          <Link
            className="btn btn-primary"
            to="/Contract/contract/new"
            style={{ marginTop: "22px" }}
            color="primary"
            auto
            ghost
          >
            Create
          </Link>
        </Col>
      </div>

      <div style={{ marginTop: "2rem" }} className="Table">
        <Table responsive>
          <thead>
            <tr>
              <th>Series</th>
              <th>Branch Name</th>
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default Setup_Branches;
