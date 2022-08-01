import Breadcrumbs from '@components/breadcrumbs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

import { Payment as createColumns } from '@columns';
import { PaymentTypeOptions } from '@FixedOptions';
import { AbilityContext } from '@src/utility/context/Can';
import { deleteItem } from '@store/actions/data';
import { arrToHashMap, isEmpty } from '@utils';
import CustomSelect from 'components/CustomSelect';
import CustomTable from 'components/CustomTable';
import { useContext, useMemo, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { toasty } from '@toast';
import { deleteRecordWithAttachments } from '../../../utility/Utils';
const Index = () => {
  const {
    Payment,
    Offline: { Payment: PaymentOffline },
    Party,
  } = useSelector((state) => state);
  const PartyMap = useMemo(() => arrToHashMap(Party), [Party]);
  const { network } = useSelector((state) => state.tempData);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const ability = useContext(AbilityContext);
  const [filters, setFilters] = useState({
    Series: {
      value: '',
      op: 'like',
    },
    PaymentType: {
      value: '',
      op: 'eq',
    },
    Party: {
      value: '',
      op: 'eq',
    },
    Amount: {
      value: '',
      op: 'like',
    },
    Range_PostingDate: {
      value: [],
      op: 'range',
    },
  });
  const history = useHistory();
  const ref = useRef();

  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: { value: _filter, op: prev[key].op } };
    });
  };

  const onDelete = (Series) => {
    deleteRecordWithAttachments({
      refDoctype: 'Payment',
      refSeries: Series,
      dispatch: dispatch,
      deleteDispatchFn: deleteItem,
    });
  };
  const Columns = useMemo(
    () =>
      createColumns({
        PartyMap,
        onDelete,
        onEdit: (row) =>
          history.push(
            `/Entry/UpdatePayment/${
              isEmpty(row?.Series) ? row.ID : row?.Series
            }`
          ),
      }),
    []
  );

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1">
          <Breadcrumbs
            breadCrumbTitle="Payment"
            breadCrumbParent="Entry"
            breadCrumbActive="Payment"
          />
        </div>
        {ability.can('create', 'DT-7') && (
          <div>
            <Link to="/Entry/NewPayment">
              <Button.Ripple color="primary">
                <FormattedMessage id="New" />
              </Button.Ripple>
            </Link>
          </div>
        )}
      </div>
      <Card>
        <CardBody>
          <Row form className="mt-1 mb-50">
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Series" />:
                </Label>
                <Input
                  placeholder={formatMessage({ id: 'Series' })}
                  onChange={(e) =>
                    handleFiltersChange('Series', e.target.value)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="PaymentType" />:
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="label"
                  valueName="value"
                  value={filters.PaymentType.value}
                  options={PaymentTypeOptions}
                  onChange={(e) =>
                    handleFiltersChange('PaymentType', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Party" />:
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="PartyName"
                  valueName="Series"
                  value={filters.Party.value}
                  options={Party}
                  onChange={(e) => {
                    handleFiltersChange('Party', e?.value ?? null);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="PostingDate" />:
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{ mode: 'range', dateFormat: 'm/d/Y' }}
                  onChange={(val) =>
                    handleFiltersChange('Range_PostingDate', val)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Amount" />:
                </Label>
                <Input
                  onKeyPress={(event) =>
                    event.charCode == 8 ||
                    event.charCode == 0 ||
                    event.charCode == 13
                      ? null
                      : event.charCode >= 48 && event.charCode <= 57
                  }
                  placeholder={formatMessage({ id: 'Amount' })}
                  value={filters.Amount.value ?? 0}
                  onChange={(e) => {
                    if (e.target.value * 1 >= 0)
                      handleFiltersChange('Amount', e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          offlineData={network ? Payment : PaymentOffline}
          columns={Columns}
          filters={filters}
        />
      </Card>
    </>
  );
};
export default Index;
