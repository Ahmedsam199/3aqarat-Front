// ** React Import
import React, { useContext, useEffect, useMemo, useState } from 'react';
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';
// ** Utils
import { isObjEmpty, toBoolean } from '@utils';
// ** Third Party Components
import CustomFormInput from '@Component/Form/CustomFormInput';
import CustomFormInputCheckbox from '@Component/Form/CustomFormInputCheckbox';
import CustomFormNumberInput from '@Component/Form/CustomFormNumberInput';
import CustomFormSelect from '@Component/Form/CustomFormSelect';
import { PartyTypeOptions } from '@FixedOptions';
import { yupResolver } from '@hookform/resolvers/yup';
import Routes from '@Routes';
import { AbilityContext } from '@src/utility/context/Can';
import { insertItem, updateItem } from '@store/actions/data';
import { toasty } from '@toast';
import { Customer as Schema } from '@validation';
import axios from 'axios';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody, Col,
  Form,
  Row,
  Spinner
} from 'reactstrap';
// import { confirmAlert2 } from '../../../utility/alert';
const POST = (props) => {
  const { t } = useTranslation()
  const { Currency, Party } = useSelector((state) => state);
  const ability = useContext(AbilityContext);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const methods = useForm({
    defaultValues: { _loading: true },
    resolver: yupResolver(Schema),
  });
  const {
    register,
    reset,
    getValues,
    formState: { errors },
    control,
    handleSubmit,
  } = methods;
  const _dataForm = useWatch({ control });
  // ** Function to handle form submit

  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      values.PartyType = toBoolean(values.PartyType);
      setLoading(true);
      dispatch(
        values.Series
          ? updateItem('Party', values)
          : insertItem('Party', values)
      )
        .then((res) => {
          toasty({ type: 'success' });
          navigate('/App/Customer');
        })
        .catch((err) => {
          console.log('hacker_it_err', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const _write = useMemo(
    () => toBoolean(ability.can('write', 'DT-6')),
    [ability.can('write', 'DT-6')]
  );
  useEffect(async () => {
    if (params.series) {
      if (!Party.length) return;
      // const _ = Party.find((x) => x.Series === params.series);
      const { data } = await axios.get(`${Routes.Party.root}/${params.series}`);

      console.log('joseph data ', data);

      reset({
        ...data,
        // IsDefault: `${_.IsDefault}`,
        // Disabled: `${_.Disabled}`,
        _loading: false,
        _write,
      });
    } else
      reset({
        _write: true,
        _loading: false,
      });
  }, [Party]);
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
        <Row>
          <Col sm="10">
            <Breadcrumbs
              breadCrumbTitle="Party"
              breadCrumbParent="Entry"
              breadCrumbParent3="Party"
              breadCrumbParent4={params.series ? 'Update' : null}
              breadCrumbActive={params.series ? params.series : 'New'}
              Series={params.series}
              breadCrumbActiveLink="/Entry/Party"
            />
          </Col>
          <Col sm="2" className="d-flex justify-content-end align-items-center">
            <Button
              color="primary"
              type="submit"
              className="mr-1"
              disabled={loading || (params.series && !_write)}
            >
              {loading && <Spinner color="white" size="sm" className="mr-1" />}
              {t("Save")}
            </Button>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="6">
                    <CustomFormSelect
                      name="PartyType"
                      options={PartyTypeOptions}
                    />
                    <CustomFormInput name="PartyName" />
                    <CustomFormSelect
                      name="DefaultCurrency"
                      textName="Currency"
                      valueName="Series"
                      options={Currency}
                    />
                    <CustomFormInput name="ContactPerson" />
                  </Col>
                  <Col sm="6">
                    <CustomFormNumberInput name="Cell" />
                    <CustomFormInput name="Phone" type="tel" />
                    <CustomFormInput name="Address" type="textarea" />
                    <Row>
                      <Col sm="6">
                        <CustomFormInputCheckbox
                          name="Disabled"
                          IsDisabled={_dataForm.IsDefault}
                        />
                      </Col>
                      <Col sm="6">
                        <CustomFormInputCheckbox
                          name="IsDefault"
                          IsDisabled={_dataForm.Disabled}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <input type="hidden" {...register('Series')} />
                <input type="hidden" {...register('_write')} />
                <input type="hidden" {...register('_loading')} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
};

export default POST;
