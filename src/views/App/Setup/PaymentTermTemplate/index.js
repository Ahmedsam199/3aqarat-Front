import Breadcrumbs from "@components/breadcrumbs";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";

import { AbilityContext } from "@src/utility/context/Can";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useMemo, useRef, useState } from "react";

  import "@styles/react/apps/app-invoice.scss";
  import "@styles/react/libs/tables/react-dataTable-component.scss";
  import "@styles/react/libs/react-select/_react-select.scss";
  import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import { PaymentTermTemplate as createColumns } from "@columns";
import { deleteItem } from "@store/actions/data";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import CustomTable from "@Component/CustomTable";
const Index = () => {
  const {
    
    PaymentTermTemplate
   
  } = useSelector((state) => state);
  console.log('testing',PaymentTermTemplate);
const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { formatMessage } = useIntl();
  const ability = useContext(AbilityContext);
  const [filters, setFilters] = useState({
    Series: {
      value: "",
      op: "like",
    },
  });
  
  const ref = useRef();

  const handleFiltersChange = (key, value) => {
    setFilters((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const onDelete = async (Series) => {
    dispatch(deleteItem("PaymentTermTemplate", Series))
      .then((res) => {
        toast.success(<SuccessToast msg="Delete Successfully!" />, {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log("hacker_it_error", err);
      });
  };

  const Columns = createColumns({
    onDelete,
    onEdit: (row) => navigate(`/Setup/UpdatePaymentTermTemplate/${row?.Series}`),
  }); 
  

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1">
          <Breadcrumbs
            breadCrumbTitle="PaymentTermTemplate"
            breadCrumbParent="Entry"
            breadCrumbActive="PaymentTermTemplate"
          />
        </div>
        {ability.can("create", "DT-4") && (
          <div>
            <Link to="/Setup/NewPaymentTermTemplate">
              <Button.Ripple color="primary">New</Button.Ripple>
            </Link>
          </div>
        )}
      </div>
      <Card>
        <CardBody>
          <Row form className="mt-1 mb-50">
            <Col lg="3" md="4">
              <FormGroup></FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          offlineData={PaymentTermTemplate}
          columns={Columns}
          filters={filters}
        />
      </Card>
    </>
  );
};
export default Index;
