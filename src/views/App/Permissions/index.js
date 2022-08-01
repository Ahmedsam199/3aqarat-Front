import CustomTable from '@Component/CustomTable';
import { ErrorToast } from '@Component/ErrorToast';
import RowActions from '@Component/RowActions';
import { SuccessToast } from '@Component/SuccessToast';
import Breadcrumbs from '@components/breadcrumbs';
import { AbilityContext } from "@src/utility/context/Can";
import { deleteItem } from '@store/actions/data';
import { getUserData } from '@utils';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button, Card,
  CardBody, Col, FormGroup, Input,
  Label, Row
} from 'reactstrap';
const Index = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const Permission = useSelector(state => state.Permission)
  const ability = useContext(AbilityContext);
  const navigate = useNavigate()
  const [filters, setFilters] = useState({});

  const ref = useRef();
  let columns = [
    {
      name: t("Series"),
      selector: 'Series',
      sortable: true,
      maxWidth: '40%',
    },
    {
      name: t("Role"),
      maxWidth: '40%',
      cell: row => row.RoleName
    },]
  // if (ability.can('delete', "Permissions") || ability.can('write', "Permissions"))
  columns.push(
    {
      name: t("Actions"),
      maxWidth: '10%',
      cell: (row) => (
        <RowActions
          subject="Permissions"
          rowId={row.Series}
          onEdit={() => {
            navigate(`/Apps/UpdatePermissions/${row.Series}`)
          }}
          onDelete={() => onDelete(row.Series)}
        />
      ),
    })
  const handleClickEvent = row => {
    navigate(`/Apps/UpdatePermissions/${row.Series}`)
  }
  const handleFiltersChange = (key, value) => {
    let _filter = value;
    setFilters((prev) => {
      return { ...prev, [key]: _filter };
    });
  };

  const onDelete = async (Series) => {
    if (getUserData().role === Permission.find(x => x.Series === Series)?.RoleName) {
      toast.error(<ErrorToast msg={t("You can Delete your Permission")} />)
      return
    }
    dispatch(deleteItem("Permission", Series)).
      then(res => {
        ref.current?.refresh();
        toast.success(<SuccessToast msg="Delete Successfully!" />, { hideProgressBar: true });
      }).catch(err => {
        console.log("hacker_it_error", err)
      })
  };

  return (
    <>
      <div className='d-flex justify-content-between'>
        <div className='flex-grow-1'>
          <Breadcrumbs
            breadCrumbTitle="Permissions"
            breadCrumbParent="Permissions"
            breadCrumbActive="Permissions"
          />
        </div>
        {
          ability.can("create", "Permissions") &&
          <div>
            <Link to="/Apps/NewPermissions">
              <Button.Ripple color="primary">
                {t("New")}
              </Button.Ripple>
            </Link>
          </div>
        }
      </div>
      <Card>
        <CardBody>
          <Row form className="mt-1 mb-50">
            <Col md="3">
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
            <Col md="3">
              <FormGroup>
                <Label>
                  {t("Role")}
                </Label>
                <Input
                  placeholder={t("Role")}
                  onChange={(e) =>
                    handleFiltersChange('RoleName', e.target.value)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CustomTable
          ref={ref}
          filters={filters}
          offlineData={Permission}
          columns={columns}
        />
      </Card>
    </>
  );
};

export default Index;
