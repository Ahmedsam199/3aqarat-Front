import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
// ** React Imports
import { useContext } from "react";
import { Input, Label } from "reactstrap";
import { Grid, Dropdown } from "@nextui-org/react";
import {  } from "@nextui-org/react";

import '../RealState/css.css'
// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

import RevenueReport from "@src/views/ui-elements/cards/analytics/RevenueReport";
const ContractContract = () => {
      const { colors } = useContext(ThemeColors);
  return (
    <>
      <div className="App">
        <Grid.Container gap={4}>
          <Grid>
            
            <Input bordered labelPlaceholder="Default" color="default" />
          </Grid>
          <Grid>
            
            <Input bordered labelPlaceholder="Primary" color="primary" />
          </Grid>
          
 
          
          <Grid>
            
            <Input bordered labelPlaceholder="Success" color="success" />
          </Grid>
          <Grid>
            
            <Input bordered labelPlaceholder="Warning" color="warning" />
          </Grid>
          <Grid>
            
            <Input bordered labelPlaceholder="Error" color="error" />
          </Grid>
        </Grid.Container>
        <br></br>
        <hr></hr>
        <h3>Payment Info</h3>
        <div className="FirstRow">
          <Col>
            {" "}
            <Label for="exampleEmail">Purpose</Label>
            <Input />
          </Col>
          <Col>
            {" "}
            <Label for="exampleEmail">From Date</Label>
            <Input type="Date" />
          </Col>
          <Col>
            {" "}
            <Label for="exampleEmail">Paid Amount</Label>
            <Input />
          </Col>
        </div>
        <br></br>
        <div className="SecondRow">
          <Col>
            {" "}
            <Label for="exampleEmail">From Date</Label>
            <Input type="Date" />
          </Col>
          <Col>
            {" "}
            <Label for="exampleEmail">paid Currency</Label>
            <Input />
          </Col>
        </div>
        
        <hr></hr>
        <h3>Extra Info</h3>
        <div className="SecondRow">
          <Col>
            {" "}
            <Label for="exampleEmail">For</Label>
            <Input type="Date" />
          </Col>
          <Col>
            {" "}
            <Label for="exampleEmail">Remark</Label>
            <Input />
          </Col>
        </div>
      </div>
    </>
  );
};

export default ContractContract;
