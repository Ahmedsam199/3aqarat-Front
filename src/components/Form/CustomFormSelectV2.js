import classnames from 'classnames';
import CustomSelectV2 from '@Component/CustomSelectV2';
import React from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from '../ErrorMessage';

function CustomFormSelect({
  name,
  title,
  textName = 'label',
  url,
  options,
  isMulti,
  valueName = 'value',
  IsDisabled = false,
  customName,
  customValue,
  customName2,
  customValue2,
  hacConfirmMessage = false,
  isClearable = false,
  IsHidden = false,
  hiddenTitle = false,
  extraOnChangeFun = null,
  ...restCustom
}) {
  const { t } = useTranslation()
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  });

  const preventBarcodeSubmit = (event) => {
    if (event.keyCode == '13') {
      event.preventDefault();
    }
  };

  return (
    <FormGroup>
      {!hiddenTitle && !IsHidden && (
        <Label for={`${name}`}>
          {t(`${title ?? name}`)}
        </Label>
      )}
      <Controller
        control={control}
        name={`${name}`}
        render={({ field: { onChange, ref, ...rest } }) => (
          <CustomSelectV2
            {...rest}
            isClearable={isClearable}
            className={classnames({
              'is-invalid': errors[`${name}`],
              'd-none': IsHidden,
            })}
            isMulti={isMulti}
            textName={textName}
            valueName={valueName}
            customName={customName}
            customValue={customValue}
            customName2={customName2}
            customValue2={customValue2}
            // onKeyDown={preventBarcodeSubmit}
            inputRef={ref}
            onChange={(val) => {
              if (isMulti) {
                onChange(val?.map((x) => x.value) ?? null);
              } else {
                onChange(val?.value ?? null);
              }
              extraOnChangeFun?.()
            }}
            url={url}
            options={options}
            isDisabled={IsDisabled}
            {...restCustom}
          />
        )}
      />
      <ErrorMessage error={errors[`${name}`]?.message} />
    </FormGroup>
  );
}

export default React.memo(CustomFormSelect);
