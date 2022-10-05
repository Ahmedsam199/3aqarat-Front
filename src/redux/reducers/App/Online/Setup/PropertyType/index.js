import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset Customer
    case Types.PropertyType.insert:
      return [...state, action.payload.value];
    //? update Customer
    case Types.PropertyType.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete Customer
    case Types.PropertyType.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set Customer
    case Types.PropertyType.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
