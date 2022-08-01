import Breadcrumbs from '@components/breadcrumbs';
import { PartyTypeOptions } from '@FixedOptions';
import { useData } from '@hooks/useData';
import Routes from '@Routes';
import { addMonths, subMonths } from '@utils';
import CustomSelect from '@Component/CustomSelect';
import CustomTable from '@Component/Report/CustomTable';
import { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  CardBody, Col, FormGroup, Input,
  Label, Row
} from 'reactstrap';
const Index = () => {
  const Accounts = useData("Accounts")
  const Customers = useData("Customer")
  const Supplier = useData("Supplier")
  const [filters, setFilters] = useState({
    From_Date: [subMonths(new Date(), 1)],
    To_Date: [addMonths(new Date, 1)]
  });
  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: _filter };
    });
  };
  return (
    <>
      <div className='d-flex justify-content-between align-items-start'>
        <div className='flex-grow-1'>
          <Breadcrumbs
            breadCrumbTitle="General Ledger"
            breadCrumbParent="Reports"
            breadCrumbActive="General Ledger"
          />
        </div>
      </div>
      <Card>
        <CardBody>
          <Row form className="mt-1 mb-50">
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="From Date" />:
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{ dateFormat: 'm/d/Y' }}
                  value={filters.From_Date}
                  onChange={(val) => handleFiltersChange('From_Date', val)}
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="To Date" />:
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{ dateFormat: 'm/d/Y' }}
                  value={filters.To_Date}
                  onChange={(val) => handleFiltersChange('To_Date', val)}
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Accounts" />:
                </Label>
                <CustomSelect
                  isClearable={true}
                  textName="AccountName"
                  valueName="Series"
                  value={filters.Account}
                  options={Accounts}
                  onChange={(e) =>
                    handleFiltersChange('Account', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Party Type" />:
                </Label>
                <CustomSelect
                  isClearable={true}
                  value={filters.Party_Type}
                  options={PartyTypeOptions}
                  onChange={(e) =>
                    handleFiltersChange('Party_Type', e?.value ?? null)
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
                  isDisabled={!filters.Party_Type}
                  valueName="Series"
                  textName={filters.Party_Type === 2 ? "SupplierName" : "CustomerName"}
                  value={filters.Party}
                  options={filters.Party_Type === 2 ? Supplier : Customers}
                  onChange={(e) =>
                    handleFiltersChange('Party', e?.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>
                  <FormattedMessage id="Voucher Num" />:
                </Label>
                <Input
                  onChange={(e) =>
                    handleFiltersChange('Voucher_Num', e.target.value ?? null)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          url={Routes.Report.GeneralLedger}
          filters={filters}
        />
      </Card>
    </>
  );
};

export default Index;
