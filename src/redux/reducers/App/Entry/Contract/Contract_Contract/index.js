import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset Contract
    case Types.Contract.insert:
      return [...state, action.payload.value];
    //? update Contract
    case Types.Contract.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete Contract
    case Types.Contract.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set Contract
    case Types.Contract.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
