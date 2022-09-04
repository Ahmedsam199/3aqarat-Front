import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset Customer
    case Types.PrintKeys.insert:
      return [...state, action.payload.value];
    //? update Customer
    case Types.PrintKeys.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete Customer
    case Types.PrintKeys.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set Customer
    case Types.PrintKeys.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
