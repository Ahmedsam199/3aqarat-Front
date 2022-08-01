import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset UOM
    case Types.Property_Terrority.insert:
      return [...state, action.payload.value];
    //? update UOM
    case Types.Property_Terrority.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete UOM
    case Types.Property_Terrority.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set UOM
    case Types.Property_Terrority.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
