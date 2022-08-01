import { SuccessToast } from '@Component/SuccessToast';
import Breadcrumbs from '@components/breadcrumbs';
import { useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';

import { Link, useNavigate } from 'react-router-dom';

import { Customer as createColumns } from '@columns';
import CustomSelect from '@Component/CustomSelect';
import CustomTable from '@Component/CustomTable';
import { PartyTypeOptions } from '@FixedOptions';
import { AbilityContext } from '@src/utility/context/Can';
import { deleteItem } from '@store/actions/data';
import { useRef, useState } from 'react';
import { AlertCircle } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const Index = () => {
  const { t } = useTranslation()
  const {
    Customer,
    tempData: { network },
    Currency,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const ability = useContext(AbilityContext);
  const [filters, setFilters] = useState({
    Series: {
      value: '',
      op: 'like',
    },
    PartyType: {
      value: '',
      op: 'eq',
    },
    PartyName: {
      value: '',
      op: 'like',
    },
    DefaultCurrency: {
      value: '',
      op: 'eq',
    },
    Phone: {
      value: '',
      op: 'like',
    },
    IsDefault: {
      value: '',
      op: 'eq',
    },
    Disabled: {
      value: '',
      op: 'eq',
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
    dispatch(deleteItem('Party', Series))
      .then((res) => {
        toast.success(<SuccessToast msg="Delete Successfully!" />, {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log('hacker_it_error', err);
      });
  };
  const Columns = useMemo(
    () =>
      createColumns({
        onDelete,
        onEdit: (row) => navigate(`/App/UpdateCustomer/${row?.Series}`),
      }),
    []
  );
  return (
    <div className='w-100'>
      <div className="w-100 d-flex justify-content-between">
        <div className="flex-grow-1">
          <Breadcrumbs
            breadCrumbTitle="Customer"
            breadCrumbParent="App"
            breadCrumbActive="Customer"
          />
        </div>
        {ability.can('create', 'DT-6') && (
          <div>
            <Link to="/App/NewCustomer">
              <Button.Ripple color="primary">
                {t("New")}
              </Button.Ripple>
            </Link>
          </div>
        )}
      </div>

      <Card>
        <CardBody>
          <Row>
            <Col md="2">
              <FormGroup>
                <Label>
                  {t("Series")}
                </Label>
                <Input
                  placeholder={t("Series")}
                  onChange={(e) =>
                    handleFiltersChange('Series', e.target.value)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  {t("PartyType")}
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="label"
                  valueName="value"
                  value={filters.PartyType.value}
                  options={PartyTypeOptions}
                  onChange={(e) =>
                    handleFiltersChange('PartyType', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  {t("PartyName")}
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="PartyName"
                  valueName="PartyName"
                  value={filters.PartyName.value}
                  options={Customer}
                  onChange={(e) =>
                    handleFiltersChange('PartyName', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  {t("DefaultCurrency")}
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="Currency"
                  valueName="Series"
                  value={filters.DefaultCurrency.value}
                  options={Currency}
                  onChange={(e) =>
                    handleFiltersChange('DefaultCurrency', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  {t("Phone")}
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="Phone"
                  valueName="Phone"
                  value={filters.Phone.value}
                  options={Customer}
                  onChange={(e) =>
                    handleFiltersChange('Phone', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  {t("IsDefault")}
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="label"
                  valueName="value"
                  value={filters.IsDefault.value}
                  options={[
                    { label: 'False', value: false },
                    { label: 'True', value: true },
                  ]}
                  onChange={(e) =>
                    handleFiltersChange('IsDefault', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  {t("Disabled")}:
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="label"
                  valueName="value"
                  value={filters.Disabled.value}
                  options={[
                    { label: 'False', value: false },
                    { label: 'True', value: true },
                  ]}
                  onChange={(e) =>
                    handleFiltersChange('Disabled', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        {network ? (
          <CustomTable
            ref={ref}
            offlineData={Customer}
            filters={filters}
            columns={Columns}
          />
        ) : (
          <Alert color="warning">
            <div className="alert-body">
              <AlertCircle size={15} />
              <strong className="ml-1">Info </strong>
              <span>
                {t("could not load the data while your are offline")}
              </span>
            </div>
          </Alert>
        )}
      </Card>
    </div>
  );
};
export default Index;
