import {
  filterPricingRulesHasOfferOnThisDay,
  secondsIsLeftToStartNewDate,
} from '@utils';
import format from 'number-format.js';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { arrToHashMap, isUserLoggedIn, onSyncData } from '@utils';
import { context } from './AppContext';
import { FormatNumber } from '@FixedOptions';

const AppProvider = ({ children }) => {
  const [pricingRulesToday, setPricingRulesToday] = useState([]);
  const dispatch = useDispatch();
  const {
    tempData: { network },
    auth: { userData },
    Currency,
    AccountInfo: { DefaultCurrency },
    PricingRuleOpened,
  } = useSelector((state) => state);
  const CurrencyMap = useMemo(() => arrToHashMap(Currency), [Currency]);
  const ref = React.useRef();
  const { CurrencyFormat: DefaultCurrencyFormat, Symbol: DefaultSymbol } =
    useMemo(
      () =>
        CurrencyMap?.get(DefaultCurrency) ?? {
          CurrencyFormat: null,
          Symbol: null,
        },
      [CurrencyMap, DefaultCurrency]
    );
  //#region Helpers
  const toMonyFormat = function ({ val, symbol, currencySeries, monyFormat }) {
    const currencyFormat = !monyFormat ? DefaultCurrencyFormat : monyFormat;
    const _formatNumber = FormatNumber.hasOwnProperty(currencyFormat)
      ? FormatNumber[currencyFormat]
      : FormatNumber[null];
    let CurrencySymbol = !!currencySeries
      ? CurrencyMap.get(currencySeries)?.Symbol
      : null;
    return format(
      `${_formatNumber} ${symbol ?? CurrencySymbol ?? DefaultSymbol}`,
      parseFloat(val ?? 0)
    );
  };
  //#endregion Helpers
  const fetchPricingRulesHasOfferOnThisDay = () => {
    if (!!PricingRuleOpened) {
      setPricingRulesToday(
        filterPricingRulesHasOfferOnThisDay(PricingRuleOpened)
      );
    } else {
      setPricingRulesToday([]);
    }
  };
  useEffect(() => {
    if (network) {
      if (isUserLoggedIn()) {
        clearTimeout(ref.current);
        ref.current = setTimeout(() => {
          onSyncData(dispatch);
        }, 1000);
      }
    }
  }, [network, userData]);
  useEffect(() => {
    fetchPricingRulesHasOfferOnThisDay();
  }, [PricingRuleOpened]);
  // TODO: thing
  useEffect(() => {
    const timeOutId = setInterval(function () {
      fetchPricingRulesHasOfferOnThisDay();
    }, secondsIsLeftToStartNewDate() * 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);
  const { Provider } = context;
  return (
    <Provider
      value={{
        pricingRulesToday,
        toMonyFormat,
      }}
    >
      {children}
    </Provider>
  );
};

//TODO : fetch Accounts when build page for Accounts

export default AppProvider;
