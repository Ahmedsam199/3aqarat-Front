import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset UOM
    case Types.Party.insert:
      return [...state, action.payload.value];
    //? update UOM
    case Types.Party.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete UOM
    case Types.Party.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set UOM
    case Types.Party.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
