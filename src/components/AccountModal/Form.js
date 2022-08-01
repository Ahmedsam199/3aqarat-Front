import { confirmAlert2 } from '@alerts';
import { yupResolver } from '@hookform/resolvers/yup';
import Routes from '@Routes';
import { insertItemByFormData, updateItemLocal } from '@store/actions/data';
import { toasty } from '@toast';
import { AccountInfo as Schema } from '@validation';
import axios from 'axios';
import CustomFormInput from 'components/Form/CustomFormInput';
import CustomFormSelect from 'components/Form/CustomFormSelect';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, ModalFooter, Spinner } from 'reactstrap';
import CustomImageInput from '../Form/CustomImageInput';

const Index = ({ close }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const {
    Currency,
    AccountInfo,
    tempData: { network },
  } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: { _write: true },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = methods;
  const onSubmit = async (values) => {
    setLoading(true);
    dispatch(
      insertItemByFormData(
        'AccountInfo',
        {
          ...values,
          AccountName: AccountInfo.AccountName,
          AccountLogo: AccountInfo.AccountLogo,
        },
        file
      )
    )
      .then((res) => {
        toasty({ type: 'success' });
        close();
      })
      .catch((err) => {
        console.log('hacker_it_err', err);
      });
    setLoading(false);
  };

  useEffect(() => {
    reset({
      _write: true,
      Phone: AccountInfo.Phone,
      Address: AccountInfo.Address,
      DefaultCurrency: AccountInfo.DefaultCurrency,
    });

    setSrc(
      network
        ? AccountInfo.AccountLogo
          ? `${Routes.ImageBaseUrl}/${AccountInfo.AccountLogo}`
          : undefined
        : undefined
    );
  }, [AccountInfo]);
  const onClear = async (src) => {
    await new Promise((resolve, reject) => {
      try {
        confirmAlert2(null, null)
          .then(async () => {
            await axios.post(`${Routes.AccountInfo.emptyAccountLogo}`, {
              AccountLogo: AccountInfo.AccountLogo,
            });
            resolve(true);
            dispatch(
              updateItemLocal('AccountInfo', {
                AccountLogo: null,
              })
            );
          })
          .catch((e) => {
            reject(e);
          });
      } catch (error) {
        reject(error);
        console.error('hacker_it error', e);
      }
    });
  };
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CustomFormInput name="Phone" />
        <CustomFormInput name="Address" />
        <CustomFormSelect
          name="DefaultCurrency"
          options={Currency}
          textName="Currency"
          valueName="Series"
          IsDisabled={!AccountInfo.IsUpdatableCurrency}
        />
        <CustomImageInput
          {...{
            setFile,
            src,
            onClear,
          }}
        />
        <ModalFooter>
          <Button color="primary" type="submit" disabled={!'network'}>
            {loading && (
              <Spinner color="white" size="sm" className="mr-1" type="border" />
            )}
            {t("Save")}
            <input type="hidden" {...register('_write')} />
            <input type="hidden" {...register('AccountLogo')} />
          </Button>
        </ModalFooter>
      </Form>
    </FormProvider>
  );
};

export default Index;
