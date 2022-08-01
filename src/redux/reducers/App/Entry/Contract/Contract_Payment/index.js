import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset UOM
    case Types.Contract_Payment.insert:
      return [...state, action.payload.value];
    //? update UOM
    case Types.Contract_Payment.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete UOM
    case Types.Contract_Payment.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set UOM
    case Types.Contract_Payment.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
