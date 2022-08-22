import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset Contract_Contract
    case Types.Contract_Contract.insert:
      return [...state, action.payload.value];
    //? update Contract_Contract
    case Types.Contract_Contract.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete Contract_Contract
    case Types.Contract_Contract.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set Contract_Contract
    case Types.Contract_Contract.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
