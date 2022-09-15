import { confirmAlert2 } from '@alerts';
import CustomSelect from '@Component/CustomSelect';
import { toBoolean } from '@utils';
import classnames from 'classnames';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from '../ErrorMessage';
function CustomFormSelect({
  name,
  title,
  loading = false,
  textName = 'label',
  url,
  defaultValue,
  options,
  isMulti,
  valueName = 'value',
  IsDisabled = false,
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
  const changeValue = (val, onChange) => {
    if (isMulti) {
      onChange(val?.map((x) => x.value) ?? null);
    } else {
      // onChange(val[valueName] ?? null)
      onChange(val?.value ?? null);
    }
    extraOnChangeFun?.()
  };
  const _write = toBoolean(useWatch({ control, name: '_write' }));
  const _loading = toBoolean(useWatch({ control, name: '_loading' }));
  const _previousValue = useWatch({ control, name });
  return (
    <>
      {!IsHidden && (
        <>
          <>
            {!hiddenTitle && (
              <Label for={`${name}`}>{t(`${title ?? name}`)}</Label>
            )}
            {!_loading ? (
              <Controller
                control={control}
                name={`${name}`}
                render={({ field: { onChange, ref, ...rest } }) => (
                  <CustomSelect
                    {...rest}
                    {...restCustom}
                    isClearable={isClearable}
                    className={classnames({
                      "is-invalid": errors[`${name}`],
                    })}
                    isMulti={isMulti}
                    defaultValue={defaultValue}
                    textName={textName}
                    valueName={valueName}
                    inputRef={ref}
                    url={url}
                    options={options}
                    isDisabled={IsDisabled || !_write}
                    onChange={(val) => {
                      if (!isMulti && _previousValue === val?.value) return;
                      if (!hacConfirmMessage) {
                        changeValue(val, onChange);
                      } else {
                        confirmAlert2(
                          null,
                          () => {
                            changeValue(val, onChange);
                          },
                          "en"
                        );
                      }
                    }}
                  />
                )}
              />
            ) : (
              <Skeleton height={37} />
            )}
            <ErrorMessage error={errors[`${name}`]?.message} />
          </>
        </>
      )}
    </>
  );
}

export default React.memo(CustomFormSelect);
