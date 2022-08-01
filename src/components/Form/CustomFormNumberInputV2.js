import { isNumber } from '@utils';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from '../ErrorMessage';
function CustomFormIntegerInput({
  name,
  title,
  defaultValue = 0,
  min,
  MAX,
  IsHidden = false,
  hiddenTitle = false,
  IsDisabled = false,
  options = {
    allowEmptyFormatting: true,
  },
  extraOnChangeFun = null,
  maxEffected = null,
  onKeyPress,
}) {
  const { t } = useTranslation()
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext();
  const watchMaxEffect = useWatch({ control, name: maxEffected?.name, disabled: !maxEffected })
  const [max, setMax] = useState(1e1000)
  const [inputLength, setInputLength] = useState(0);
  useEffect(() => {
    if (MAX) setMax(MAX)
    else if (!!maxEffected) {
      setMax(maxEffected?.fun?.())
    }
  }, [watchMaxEffect, MAX])
  // const preventBarcodeSubmit = (event) => {
  //   if (event.which == '13') {
  //     if (_dataForm?.Barcode?.length > 16) {
  //       setValue('Barcode', event.target.value.slice(inputLength));
  //       setInputLength(event.target.value.slice(inputLength).length);
  //       event.preventDefault();
  //     } else {
  //       setInputLength(_dataForm?.Barcode?.length);
  //       event.preventDefault();
  //     }
  //   }
  // };

  return (
    <>
      {!IsHidden && !hiddenTitle && (
        <Label Label for={`${name}`}>
          {t(`${title ?? name}`)}
        </Label>
      )}
      <Controller
        name={`${name}`}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, ...rest } }) => (
          <NumberFormat
            {...rest}
            onChange={(data) => { onChange(data); extraOnChangeFun?.() }}
            isAllowed={(values) => {
              const { floatValue } = values;
              if (!floatValue && floatValue !== 0) return true;
              if (isNumber(min) && isNumber(max))
                return floatValue >= min && floatValue <= max;
              if (isNumber(min)) return floatValue >= min;
              if (isNumber(max)) return floatValue <= max;
              return true;
            }}
            className={classnames('form-control', {
              'is-invalid': errors[`${name}`],
              'd-none': IsHidden,
            })}
            disabled={IsDisabled}
            {...options}
            onKeyPress={(e) => {
              if (onKeyPress) onKeyPress(e);
            }}
          />
        )}
      />
      {!IsHidden && <ErrorMessage error={errors[`${name}`]?.message} />}
    </>
  );
}

export default React.memo(CustomFormIntegerInput);
