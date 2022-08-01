import { toBoolean } from '@utils';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Input, FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from '../ErrorMessage';

function CustomFormInputCheckbox({
  name,
  direction = 'row',
  title,
  IsDisabled = false,
  hiddenTitle = false,
  ...rest
}) {
  const { t } = useTranslation()
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const _write = toBoolean(useWatch({ control, name: '_write' }));
  const _loading = toBoolean(useWatch({ control, name: '_loading' }));
  return (
    <div
      style={{
        background: IsDisabled ? '#77777736' : '',
      }}
    >
      <Label
        for={`${name}`}
        style={{ userSelect: 'none' }}
        className={`d-flex ${'flex-' + direction
          } align-items-center `}
      >
        {!hiddenTitle && (
          <p className="m-0 p-0">
            {t(`${title ?? name}`)}
          </p>
        )}
        {!_loading ? (
          <Controller
            name={`${name}`}
            control={control}
            defaultValue={false}
            render={({ field: { ref, ...rest } }) => (
              <Input
                {...rest}
                checked={rest.value}
                type="checkbox"
                innerRef={ref}
                id={`${name}`}
                className="position-relative m-0 "
                disabled={IsDisabled || !_write}
              />
            )}
          />
        ) : (
          <Skeleton height={17} />
        )}
      </Label>

      <ErrorMessage error={errors[`${name}`]?.message} />
    </div>
  );
}

export default React.memo(CustomFormInputCheckbox);
