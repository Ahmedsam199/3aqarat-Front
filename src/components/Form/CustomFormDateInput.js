import { toBoolean } from '@utils';
import classnames from 'classnames';
import React from 'react';
import Flatpickr from 'react-flatpickr';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import {
  FormGroup,
  Label
} from 'reactstrap';

function CustomFormDateInput({ IsDisabled = false, loading = false, name, title, defaultValue = [new Date()], options = { dateFormat: 'd-m-Y H:i', enableTime: true } }) {
  const { t } = useTranslation()
  const { formState: { errors }, control } = useFormContext()
  const _loading = toBoolean(useWatch({ control, name: "_loading" }))
  return (
    <FormGroup>
      <Label for={`${name}`}>
        {t(`${title ?? name}`)}
      </Label>
      {/* { */}
      {/* // !IsDisabled ? */}
      {
        !_loading ?
          <Controller
            name={`${name}`}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, ...rest } }) => (
              <Flatpickr
                {...rest}
                onChange={(date) => onChange(date)}
                className={classnames('form-control', { 'is-invalid': errors[`${name}`], })}
                options={options}
              />
            )}
          /> :
          <div className='d-flex align-items-end' style={{ overflow: "hidden" }}>
            <Skeleton height={37} width={400} />
          </div>
      }
      {/* :
    <Input value={new Date(defaultValue).toLocaleDateString()} disabled={IsDisabled} />
} */}
      <small className="text-danger">
        {errors[`${name}`] && 'Date is required'}
      </small>
    </FormGroup>
  )
}

export default React.memo(CustomFormDateInput)
