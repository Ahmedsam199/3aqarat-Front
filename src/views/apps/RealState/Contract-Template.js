import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
// ** React Imports
import { useContext, useState, useRef, useEffect } from "react";
import { Button, Input, Label } from "reactstrap";
import * as React from "react";
import { Grid } from "@nextui-org/react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Table, Card } from "reactstrap";
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
const Contract_Template = () => {
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
         name: "T-1",

         category: "Territory",
         views: "200m",
         time: "Rent",
         revenue: "400 $",
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
                 </div>
               </div>
             </td>
             <td>
                 <span>{col.category}</span>
               
             </td>
           </tr>
         );
       });
     };

  return (
    <div className="App">
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
              to="/Property/Property/new"
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

                <th>Template Name</th>
              </tr>
            </thead>
            <tbody>{renderData()}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Contract_Template;
