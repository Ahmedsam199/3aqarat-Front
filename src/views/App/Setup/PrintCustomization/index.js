import { Contract_Template as createColumns } from '@columns';
import CustomTable from '@Component/CustomTable';
import Breadcrumbs from '@components/breadcrumbs';
import { AbilityContext } from '@src/utility/context/Can';
import { deleteItem } from '@store/actions/data';
import { toasty } from '@toast';
import { t } from 'i18next';
import { useContext, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';
import Modal from './modal';
const Index = () => {
  const { ContractTemplates } = useSelector((state) => state);
  const [open, setOpen] = useState()
  const dispatch = useDispatch();
  const ability = useContext(AbilityContext);
  const [filters, setFilters] = useState({
    Series: {
      value: '',
      op: 'like',
    },
  });
  const navigate = useNavigate();
  const ref = useRef();
  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: { value: _filter, op: prev[key].op } };
    });
  };

  const onDelete = async (Series) => {
    dispatch(deleteItem("ContractTemplates", Series))
      .then((res) => {
        ref.current?.refresh();
        toasty({ type: "success" });
      })
      .catch((err) => {
        console.log("hacker_it_error", err);
      });
  };
  const Columns = createColumns({
    onDelete,
    onEdit: (row) =>
      navigate(
        `/Setup/UpdatePrintCustomization/${row.Series}/${row.Name}/${row.Doctype}/${row.isRtl}/${row.isReceipt}/${row.isDefault}/${row.isLandscape}`
      ),
  });
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1">
          <Breadcrumbs
            breadCrumbTitle="PrintCustomization"
            breadCrumbParent="Setting"
            breadCrumbActive="PrintCustomization"
          />
        </div>
        {ability.can("create", "DT-9") && (
          <div>
            <Button.Ripple
              color="primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              {t("New")}
            </Button.Ripple>
          </div>
        )}
      </div>
      <Card>
        <CardBody>
          <Row form className="mt-1 mb-50">
            <Col md="2">
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
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          offlineData={ContractTemplates}
          columns={Columns}
          filters={filters}
        />
      </Card>
      <Modal open={open} onModalClose={() => setOpen(false)} />
    </>
  );
};
export default Index;
