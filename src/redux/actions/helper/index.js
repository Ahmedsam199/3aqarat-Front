import { toasty } from '@toast';
import { getNameCurrency } from './utils';
import Routes from '@Routes';
import axios from 'axios';
import Types from '@Types';
export const getCurrencyExchangeRate = ({
  from,
  to,
  showError = true,
} = {}) => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const {
        CurrencyExchange,
        Currency,
        auth: {
          userData: { defaultCurrency: DefaultCurrency },
        },
      } = getState();

      /**
       * 0 both empty
       * 1 from empty
       * 2 to empty
       * 3 both full
       */
      switch (parseInt(`${+!!from}${+!!to}`, 2)) {
        case 0:
          resolve(1);
          break;
        case 1:
          if (DefaultCurrency === to) resolve(1);
          else {
            const ex = CurrencyExchange.filter(
              (x) => x?.FromCurrency === DefaultCurrency && x?.ToCurrency === to
            );
            if (!ex.length) {
              showError &&
                toasty({
                  type: 'error',
                  msg: `MissingExchange`,
                  values: {
                    From: getNameCurrency(Currency, DefaultCurrency),
                    To: getNameCurrency(Currency, to),
                  },
                });
              resolve(0);
            }
            resolve(
              ex.reduce((a, b) => (a.Date > b.Date ? a : b))?.ExchangeRate
            );
          }
          break;
        case 2:
          if (DefaultCurrency === from) resolve(1);
          else {
            const ex = CurrencyExchange.filter(
              (x) =>
                x?.FromCurrency === from && x?.ToCurrency === DefaultCurrency
            );
            if (!ex.length) {
              showError &&
                toasty({
                  type: 'error',
                  msg: `MissingExchange`,
                  values: {
                    From: getNameCurrency(Currency, from),
                    To: getNameCurrency(Currency, DefaultCurrency),
                  },
                });
              resolve(0);
            }
            resolve(
              ex.reduce((a, b) => (a.Date > b.Date ? a : b))?.ExchangeRate
            );
          }
          break;
        case 3:
          if (from === to) return resolve(1);

          const ex = CurrencyExchange.filter(
            (x) => x?.FromCurrency === from && x?.ToCurrency === to
          );

          if (!ex.length) {
            showError &&
              toasty({
                type: 'error',
                msg: `MissingExchange`,
                values: {
                  From: getNameCurrency(Currency, from),
                  To: getNameCurrency(Currency, to),
                },
              });
            resolve(0);
          }
          resolve(ex.reduce((a, b) => (a.Date > b.Date ? a : b))?.ExchangeRate);
          break;
        default:
          console.log('hacker_it', 'nothing');
          break;
      }
    });
  };
};
// export const toMonyFormat = ({ val, symbol, currencySeries, monyFormat }) => {
//     return (dispatch, getState) => {
//         const { Currency, AccountInfo: { DefaultCurrency } } = getState()
//         const { CurrencyFormat: DefaultCurrencyFormat, Symbol: DefaultSymbol } = Currency.find(x => x.Series === DefaultCurrency)
//         const currencyFormat = !monyFormat ? DefaultCurrencyFormat : monyFormat;
//         const _formatNumber = FormatNumber.hasOwnProperty(currencyFormat) ? FormatNumber[currencyFormat] : FormatNumber[null];
//         let CurrencySymbol = !!currencySeries ? CurrencyMap.get(currencySeries)?.Symbol : null;
//         return format(`${_formatNumber} ${symbol ?? CurrencySymbol ?? DefaultSymbol}`, parseFloat(val ?? 0));
//     }

// }
export const changeActiveTab = (index) => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: Types.ChangeActiveTab,
        payload: index,
      });
    });
  };
};
export const changeTabs = (data) => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: Types.ChangeTabs,
        payload: data,
      });
    });
  };
};
export const readNotification = (values) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.patch(`${Routes.Notification.root}/${values.Series}`);
        if (res.status === 200) {
          resolve(true);
        } else {
          reject(res);
        }
      } catch (e) {
        console.error('hacker_it error', e);
        reject(e);
      }
    });
  };
}