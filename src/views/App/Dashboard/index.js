// ** React Imports
import { useContext } from "react";

// ** Icons Imports
import { Home, List } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";
import AvatarGroup from "@components/avatar-group";
import Timeline from "@components/timeline";

// ** Utils
import { kFormatter } from "@utils";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";

// ** Demo Components
import CardAppDesign from "@src/views/ui-elements/cards/advance/CardAppDesign";
import CardCongratulations from "@src/views/ui-elements/cards/advance/CardCongratulations";
import AvgSessions from "@src/views/ui-elements/cards/analytics/AvgSessions";
import Sales from "@src/views/ui-elements/cards/analytics/Sales";
import SupportTracker from "@src/views/ui-elements/cards/analytics/SupportTracker";
import OrdersReceived from "@src/views/ui-elements/cards/statistics/OrdersReceived";
import StatsWithAreaChart from "@components/widgets/stats/StatsWithAreaChart";
import SubscribersGained from "@src/views/ui-elements/cards/statistics/SubscribersGained";
import { Map, Marker, GeoJson, GeoJsonFeature, Point } from "pigeon-maps";
// ** Images
import toast from "react-hot-toast";
import jsonImg from "@src/assets/images/icons/json.png";
import ceo from "@src/assets/images/portrait/small/avatar-s-9.jpg";
// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
// import toast from "react-hot-toast";
const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);
const {
  Contracts,
  ContractType,
  Property,
  Party,
  Currency,
  CurrencyExchange,
  tempData: { network },
  Offline,
} = useSelector((state) => state);
  // ** Vars
  const avatarGroupArr = [
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Billy Hopkins",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-9.jpg").default,
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Amy Carson",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-6.jpg").default,
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Brandon Miles",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-8.jpg").default,
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Daisy Weber",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-7.jpg").default,
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: "Jenny Looper",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-20.jpg").default,
    },
  ];
  const data = [
    {
      title: "12 Invoices have been paid",
      content: "Invoices have been paid to the company.",
      meta: "",
      metaClassName: "me-1",
      customContent: (
        <div className="d-flex align-items-center">
          <img className="me-1" src={jsonImg} alt="data.json" height="23" />
          <span>data.json</span>
        </div>
      ),
    },
    {
      title: "Client Meeting",
      content: "Project meeting with john @10:15am.",
      meta: "",
      metaClassName: "me-1",
      color: "warning",
      customContent: (
        <div className="d-flex align-items-center">
          <Avatar img={ceo} />
          <div className="ms-50">
            <h6 className="mb-0">John Doe (Admin)</h6>
            <span>CEO of Infibeam</span>
          </div>
        </div>
      ),
    },
    {
      title: "Create a new project for client",
      content: "Add files to new design folder",
      color: "info",
      meta: "",
      metaClassName: "me-1",
      customContent: <AvatarGroup data={avatarGroupArr} />,
    },
    {
      title: "Create a new project for client",
      content: "Add files to new design folder",
      color: "danger",
      meta: "",
      metaClassName: "me-1",
    },
  ];
  const ToastContent = ({name}) => {
    return (
      <center>
        <div
          style={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            // padding: "10px",
            fontSize:"15px"
          }}
        >
          <div style={{ color: "#7367f0" }}>
            <Home size={25} />
          </div>
          <br />
          <p>Owner :{name}</p>
        </div>
      </center>
    );
  };

const ShowPosition=(x)=>{

  Party.forEach(y => {
    if(y.Series==x.Party){
toast((name) => <ToastContent name={y.FullName} />);
      }
  });
  }
  return (
    <div id="dashboard-analytics">
      <Row className="match-height">
        <Col lg="6" sm="12">
          <CardCongratulations />
        </Col>
        <Col lg="3" sm="6">
          <SubscribersGained kFormatter={kFormatter} />
        </Col>
        <Col lg="3" sm="6">
          <OrdersReceived
            kFormatter={kFormatter}
            warning={colors.warning.main}
          />
        </Col>
      </Row>
      {/* <Row className="match-height">
        <Col lg="6" xs="12">
          <AvgSessions primary={colors.primary.main} />
        </Col>
        <Col lg="6" xs="12">
          <SupportTracker
            primary={colors.primary.main}
            danger={colors.danger.main}
          />
        </Col>
      </Row> */}
      <Row className="match-height">
        <CardBody>
          <Col sm="12">
            <h3>Property On map</h3>
            <Map
              height={300}
              defaultCenter={[36.1901, 43.993]}
              defaultZoom={11}
            >
              $
              {Property.map((x) => (
                <Marker
                  id="TooltipExample"
                  onClick={() => ShowPosition(x)}
                  width={50}
                  anchor={[x.Longitude, x.Latitude]}
                />
                
              ))}
            </Map>
          </Col>
        </CardBody>
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
