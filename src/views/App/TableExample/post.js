// ** React Import
import Breadcrumbs from '@components/breadcrumbs';
import { PaymentTypeOptions } from '@FixedOptions';
import { yupResolver } from '@hookform/resolvers/yup';
import Routes from '@Routes';
import { AbilityContext } from '@src/utility/context/Can';
import { insertItem, updateItem } from '@store/actions/data';
import { toasty } from '@toast';
import { deepCopy, fixDuplicateOptions, parseNumber, toBoolean } from '@utils';
import { Payment as Schema } from '@validation';
import axios from 'axios';
import CustomFormDateInput from 'components/Form/CustomFormDateInput';
import CustomFormInput from 'components/Form/CustomFormInput';
import CustomFormSelect from 'components/Form/CustomFormSelect';
import PreviewFormValue from 'components/Form/PreviewFormValue';
import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {
  Button,
  Card,
  CardBody,
  Col, Form,
  Row,
  Spinner
} from 'reactstrap';
import { receiptTime, sendAttachment, sleep } from '../../../utility/Utils';
import ReferenceList from './ReferenceList';
const POST = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const ability = useContext(AbilityContext);
  const navigate = useNavigate();
  const params = useParams();

  const methods = useForm({
    resolver: yupResolver(Schema),
  });
  const {
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
    control,
    handleSubmit,
  } = methods;

  const _write = useMemo(
    () => toBoolean(ability.can('write', 'DT-7')),
    [ability.can('write', 'DT-7')]
  );

  // ** Function to handle form submit
  const onSubmit = (values) => {
    setLoading(true);
    dispatch(
      values.Series || values.ID
        ? updateItem('Payment', values)
        : insertItem('Payment', values)
    )
      .then(({ Series }) => {
        if (Attachment.length > 0) {
          sendAttachment({
            files: Attachment,
            refDoctype: 'Payment',
            refSeries: Series,
          });
        }
        toasty({ type: 'success' });
        navigate('/Entry/Payment');
        setLoading(false);
      })
      .catch((err) => {
        console.log('hacker_it_err', err);
        setLoading(false);
      });
  };


  const updateFormData = async () => {
    if (params?.mobileSeries) {
      const { data } = await axios.get(
        `${Routes.Payment.root}/${params.mobileSeries}?mobile=true`
      );
      const {
        data: {
          0: [{ totalDebtAmt }],
        },
      } = await axios.get(
        `${Routes.Party.Balance}/?PartySeries=${data.customerSeries}`
      );
      fixDuplicateOptions.init({
        selections: data.creditAmountList,
        selected_ID: 'currency',
        data: Currency,
      });
      const Reference = data.creditAmountList.map((x) => {
        return {
          currencySeries: x.currency,
          amount: x.value,
          rate: x.rate,
        };
      });
      reset({
        ...data,
        PaymentType: false,
        Party: data.customerSeries,
        Remarks: '',
        PostingDate: data.paymentDate,
        AppSeries: data.paymentSeries,
        Amount: Reference.reduce(
          (sum, x) => parseNumber(x.amount) * parseNumber(x.rate) + sum,
          0
        ),
        TotalAmount: totalDebtAmt,
        Reference,
        PostingDate: receiptTime(data.paymentDate),
        _write,
      });
      sleep().then(() => setLoading(false));
    } else if (params.series) {
      if (network) {
        const _ = deepCopy(Payment.find((x) => x.Series === params.series));
        reset({
          ..._,
          _write,
        });
        sleep().then(() => setLoading(false));
      } else {
        const _ = deepCopy(PaymentOffline.find((x) => x.ID == params.series));
        reset({
          ..._,
          _write,
        });
        sleep().then(() => setLoading(false));
      }
    } else {
      reset({
        Reference: [{}],
        _write: true,
      });
      sleep().then(() => setLoading(false));
    }
  };
  useEffect(() => {
    updateFormData();
  }, [params?.mobileSeries]);
  // take array and value then  return Array,
  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} className=" h-100">
          <Row>
            <Col sm="8">
              <Breadcrumbs
                breadCrumbTitle="Payment"
                breadCrumbParent="Entry"
                breadCrumbParent3="Payment"
                breadCrumbParent4={params.series ? 'Update' : null}
                breadCrumbActive={params.series ? params.series : 'New'}
                Series={params.series}
                breadCrumbActiveLink="/Entry/Payment"
              />
            </Col>
            <Col
              sm="4"
              className={
                !params.series &&
                'd-flex justify-content-end align-items-center'
              }
            >
              {toBoolean(_dataForm._write) && (
                <Button
                  type="submit"
                  className="mr-1"
                  color="primary"
                >
                  {toBoolean(_dataForm._loading) && (
                    <Spinner color="white" size="sm" className="mr-1" />
                  )}
                  <FormattedMessage id="Submit" />
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col sm="6">
                      <CustomFormSelect
                        options={PaymentTypeOptions}
                        name="PaymentType"
                      />
                      <CustomFormSelect
                        options={Party}
                        textName="PartyName"
                        valueName="Series"
                        name="Party"
                      />
                    </Col>
                    <Col sm="6">
                      <CustomFormDateInput name="PostingDate" />
                      <CustomFormInput type="textarea" name="Remarks" />
                    </Col>
                  </Row>
                  {/* **********two ********** */}
                  <Row>
                    <Col sm="12">
                      <hr />
                      <ReferenceList {...{ loading, }} />
                      <hr />
                    </Col>
                  </Row>
                  {/* forth */}
                  <Row>
                    <Col sm="4">
                      <PreviewFormValue
                        name="TotalAmount"
                        currency="PartyCurrency"
                      />
                    </Col>
                    <Col sm="4">
                      <PreviewFormValue name="Amount" title="PaidAmount" />
                    </Col>
                    <Col sm="4">
                      <PreviewFormValue name="OutstandingAmount" />
                    </Col>
                  </Row>
                </CardBody>
                <input type="hidden" {...register('Series')} />
                <input type="hidden" {...register('PartyCurrency')} />
                <input type="hidden" {...register('ID')} />
                <input type="hidden" {...register('_write')} />
                <input type="hidden" {...register('_loading')} />
              </Card>
            </Col>
          </Row>
        </Form>
      </FormProvider>
    </>
  );
};
export default memo(POST);
