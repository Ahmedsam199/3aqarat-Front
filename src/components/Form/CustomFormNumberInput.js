import { toBoolean } from '@utils';
import classnames from 'classnames';
import Cleave from 'cleave.js/react';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from '../ErrorMessage';

function CustomFormNumberInput({
  name,
  title,
  loading = false,
  IsHidden = false,
  IsDisabled = false,
  defaultValue = 0,
  hiddenTitle = false,
  extraOnChangeFun = null,
  options = {
    numeral: true,
    numeralDecimalScale: 50,
    numeralPositiveOnly: true,
  },
}) {
  const { t } = useTranslation()
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const _write = toBoolean(useWatch({ control, name: '_write' }));
  const _loading = toBoolean(useWatch({ control, name: '_loading' }));
  return (
    <>
      {!IsHidden && !hiddenTitle && (
        <Label for={`${name}`}>
          {t(`${title ?? name}`)}
        </Label>
      )}
      {!_loading ? (
        <Controller
          name={`${name}`}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, ...rest } }) => (
            <Cleave
              {...rest}
              options={{
                ...options,
              }}
              onChange={(e) => {
                onChange(e);
                extraOnChangeFun?.(e);
              }}
              className={classnames('form-control', {
                'is-invalid': errors[`${name}`],
                'd-none': IsHidden,
              })}
              readOnly={IsDisabled || !_write}
            />
          )}
        />
      ) : (
        <Skeleton height={37} />
      )}

      {!IsHidden && <ErrorMessage error={errors[`${name}`]?.message} />}
    </>
  );
}

export default React.memo(CustomFormNumberInput);
