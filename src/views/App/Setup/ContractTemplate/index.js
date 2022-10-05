import { ContractTemplate as createColumns } from '@columns';
import CustomTable from '@Component/CustomTable';
import Breadcrumbs from '@components/breadcrumbs';
import { AbilityContext } from '@src/utility/context/Can';
import { deleteItem } from '@store/actions/data';
import { toasty } from '@toast';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import CustomSelect from '../../../../components/CustomSelect';
import Modal from './modal';
const Index = () => {
  const { ContractTemplate, DocType } = useSelector((state) => state);
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [open, setOpen] = useState()
  const dispatch = useDispatch();
  const ability = useContext(AbilityContext);
  const [filters, setFilters] = useState({
    Series: {
      value: '',
      op: 'like',
    },
    Doctype: {
      value: '',
      op: 'eq',
    },
  });
  const ref = useRef();
  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: { value: _filter, op: prev[key].op } };
    });
  };

  const onDelete = async (Series) => {
    dispatch(deleteItem('ContractTemplate', Series))
      .then((res) => {
        ref.current?.refresh();
        toasty({ type: 'success' })
      })
      .catch((err) => {
        console.log('hacker_it_error', err);
      });
  };
  const Columns = createColumns({
    onDelete,
    onEdit: (row) => {
      navigate(`/Setup/UpdateContractTemplate/${row.Series}/${row.Name}/${row.Doctype}/${row.IsRtl}/${row.IsReceipt}/${row.IsDefault}/${row.IsLandscape}`);
    },
  });
  return (
    <>
      <div className="d-flex justify-content-between"></div>
      <Card>
        <CardBody>
          {ability.can("create", "DT-9") && (
            <div className="d-flex justify-content-between">
              <div></div>
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
          <Row className="mt-1 mb-50">
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
            <Col md="2">
              <FormGroup>
                <Label>{t("Doctype")}</Label>
                <CustomSelect
                  isClearable={true}
                  valueName="Series"
                  textName="DocType"
                  value={filters.Doctype.value}
                  options={DocType}
                  onChange={(e) => {
                    handleFiltersChange("Doctype", e?.value ?? null);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          offlineData={ContractTemplate}
          columns={Columns}
          filters={filters}
        />
      </Card>
      <Modal open={open} onModalClose={() => setOpen(false)} />
    </>
  );
};
export default Index;
