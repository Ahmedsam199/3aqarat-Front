import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset Contract_Contract
    case Types.Currency.insert:
      return [...state, action.payload.value];
    //? update Currency
    case Types.Currency.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete Currency
    case Types.Currency.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set Currency
    case Types.Currency.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
