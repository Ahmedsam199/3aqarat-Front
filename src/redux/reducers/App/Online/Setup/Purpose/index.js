import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset Customer
    case Types.Purpose.insert:
      return [...state, action.payload.value];
    //? update Customer
    case Types.Purpose.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete Customer
    case Types.Purpose.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set Customer
    case Types.Purpose.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
