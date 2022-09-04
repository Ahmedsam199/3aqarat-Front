import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

import RevenueReport from "@src/views/ui-elements/cards/analytics/RevenueReport";
const Hello = () => {
     const { colors } = useContext(ThemeColors);
  return (
    <>
      <Row>
        <Col xl="4" md="6" xs="12">
          <CardMedal />
        </Col>
        <span style={{ padding: "3px" }}></span>
        <Col lg="8" md="12">
          <RevenueReport
            primary={colors.primary.main}
            warning={colors.warning.main}
          />
        </Col>
      </Row>
    </>
  );
};

export default Hello;
