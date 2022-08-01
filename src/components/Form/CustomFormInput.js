import InputPasswordToggle from '@components/input-password-toggle'
import { toBoolean } from '@utils'
import classnames from 'classnames'
import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import InputMask from 'react-input-mask'
import Skeleton from 'react-loading-skeleton'
import {
  FormGroup, Input,
  InputGroup, Label
} from 'reactstrap'
import { ErrorMessage } from '../ErrorMessage'

function CustomFormInput({ name, loading = false, title, type = "text", IsDisabled = false, defaultValue = "", hiddenTitle = false }) {
  const { t } = useTranslation()
  const { control, formState: { errors } } = useFormContext();
  const _write = toBoolean(useWatch({ control, name: "_write" }))
  const _loading = toBoolean(useWatch({ control, name: "_loading" }))
  return (
    <>
      {!hiddenTitle &&
        <Label for={`${name}`}>
          {t(`${title ?? name}`)}
        </Label>
      }
      {
        !_loading ?
          <>
            {
              type === 'password' ?
                <Controller
                  control={control}
                  name={`${name}`}
                  render={({ field }) => (
                    <InputPasswordToggle
                      {...field}
                      className="input-group-merge"
                      inputClassName={classnames('form-control', { 'is-invalid': errors[`${name}`], })}
                      readOnly={IsDisabled || !_write}
                    />
                  )}
                />
                : type == 'tel' ?
                  <Controller
                    control={control}
                    name={`${name}`}
                    render={({ field }) => (
                      <InputMask
                        {...field}
                        invalid={errors[`${name}`] && true}
                        inputClassName={classnames('form-control', { 'is-invalid': errors[`${name}`], })}
                        readOnly={IsDisabled || !_write}
                        mask="+\964 999 999 9999"
                        className="form-control"
                        maskChar=" "
                      />
                    )}
                  />
                  :
                  <InputGroup className={type === 'email' && 'mb-2'}>
                    <Controller
                      id={`${name}`}
                      name={`${name}`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          type={type}
                          invalid={errors[`${name}`] && true}
                          {...field}
                          readOnly={IsDisabled || !_write}
                        />
                      )}
                    />
                  </InputGroup>
            }
          </>
          :
          <Skeleton height={37} />
      }
      <ErrorMessage error={errors[`${name}`]?.message} />
    </>
  )
}

export default React.memo(CustomFormInput)
