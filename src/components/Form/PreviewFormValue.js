import React, { useEffect, useState } from 'react';

import classnames from 'classnames';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Money from '../Money';
import HandleValue from './HandleValue';
function PreviewFormValue({
  name,
  title,
  hiddenTitle = false,
  fontHeader = '1.5rem',
  fontBody = '1.7rem',
  dir = 'column',
  className,
  currency,
  isSymbol,
  inTable = false,
  onChange = null,
  CurrencyMap = null,
  ...rest
}) {
  const { t } = useTranslation()
  const { control, register } = useFormContext();
  const [symbol, setSymbol] = useState(null)
  const val = useWatch({ control, name });
  const watchCurrency = useWatch({ control, name: currency, disabled: !currency });
  useEffect(() => {
    !!currency && isSymbol && setSymbol(CurrencyMap?.get(watchCurrency)?.Symbol)
  }, [watchCurrency])
  return (
    <div
      className={
        !inTable &&
        `d-flex flex-${dir} justify-content-${dir === 'column' ? 'center' : 'between'
        } align-items-center ${className ?? ''}`
      }
      {...rest}
    >
      {!hiddenTitle && !inTable && (
        <h1 style={{ fontSize: fontHeader }}>
          {t(`${title ?? name}`)} {dir === 'row' && ':'}
        </h1>
      )}
      <h2
        className={classnames('font-weight-bolder')}
        style={{ fontSize: fontBody }}
      >
        <Money
          {...{
            currencySeries:
              typeof watchCurrency === 'string' ? watchCurrency : null,
            symbol,
            val,
            isSymbol,
          }}
        />
      </h2>
      <HandleValue {...{ name, onChange }} />
    </div>
  );
}

export default React.memo(PreviewFormValue);
