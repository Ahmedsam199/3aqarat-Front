import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset Contract_Contract
    case Types.CurrencyExchange.insert:
      return [...state, action.payload.value];
    //? update CurrencyExchange
    case Types.CurrencyExchange.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete CurrencyExchange
    case Types.CurrencyExchange.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set CurrencyExchange
    case Types.CurrencyExchange.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
