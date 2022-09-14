import { getCurrencyExchangeRate } from '@store/actions/helper';
import { context } from '../context/AppContext';
import React, { memo, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sleep } from '../utility/Utils';
const Money = ({
  val = 0,
  symbol = null,
  isSymbol,
  currencySeries = null,
  monyFormat = null,
}) => {
  const dispatch = useDispatch();
  const { toMonyFormat } = useContext(context);
  const [tempVal, setTempVal] = useState(0);
  useEffect(async () => {
    const res = !isSymbol
      ? await dispatch(getCurrencyExchangeRate({ to: currencySeries }))
      : 1;
    setTempVal(res * val);
  }, [val, currencySeries]);
  return (
    <>{toMonyFormat({ val: tempVal, symbol, currencySeries, monyFormat })}</>
  );
};
export default memo(Money);
