import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset Contract_Contract
    case Types.Contracts.insert:
      return [...state, action.payload.value];
    //? update Contracts
    case Types.Contracts.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete Contracts
    case Types.Contracts.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set Contracts
    case Types.Contracts.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
