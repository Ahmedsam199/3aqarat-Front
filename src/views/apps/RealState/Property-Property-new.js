import { useContext, useState, useRef, useEffect } from "react";
import { Button, Input, Label } from "reactstrap";
import { Row, Col } from "reactstrap";
import { Table, Card } from "reactstrap";
import { Grid, Dropdown } from "@nextui-org/react";
import "../RealState/css.css";
import {
  Monitor,
  Coffee,
  Watch,
  TrendingUp,
  TrendingDown,
} from "react-feather";
import Avatar from "@components/avatar";
const Property_Property_new = () => {
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
        <Grid.Container gap={4}>
          <Grid>
            <Label>Party</Label>
            <Input bordered labelPlaceholder="Default" color="default" />
          </Grid>
          <Grid>
            <Label>Territory</Label>
            <Input bordered labelPlaceholder="Primary" color="primary" />
          </Grid>

          <Grid>
            <Label>Purpose</Label>
            <Input bordered labelPlaceholder="Success" color="success" />
          </Grid>
          <Grid>
            <Label>Requested Amount</Label>
            <Input bordered labelPlaceholder="Warning" color="warning" />
          </Grid>
          <Grid>
            <Label>Requested Amount Currency</Label>
            <Input bordered labelPlaceholder="Error" color="error" />
          </Grid>
          <Grid style={{ marginTop: "32px" }}>
            <Label>Is FurnIshed</Label>
            <Input type="checkbox" />
          </Grid>
        </Grid.Container>
      </div>
      <hr></hr>
      <div style={{ marginTop: "2rem" }}>
        <Row>
          <Col lg="6" md="7" className="Table">
            <Table responsive>
              <thead>
                <tr>
                  <th>Series</th>
                  <th>Full Name</th>
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </Table>
          </Col>

          <Col className="Table" lg="6" md="100">
            <Table responsive>
              <thead>
                <tr>
                  <th>Series</th>
                  <th>Full Name</th>
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </Table>
              <span>Total Value:23$</span> <span>Total subject:1</span>
          </Col>
        </Row>
      </div>
      <hr></hr>
      <Label>Maps</Label>
      
    </div>
  );
};

export default Property_Property_new;
