import Types from "@Types";

const reducer = (state = [], action) => {
  switch (action.type) {
    //? inset 
    case Types.DocType.insert:
      return [...state, action.payload.value];
    //? update DocType
    case Types.DocType.update:
      return [
        ...state.map((x) => {
          if (x.Series === action.payload.Series) return action.payload.value;
          else return x;
        }),
      ];
    //? delete DocType
    case Types.DocType.delete:
      return [...state.filter((x) => x.Series !== action.payload.Series)];
    // ? clear all data
    case Types.clear:
      return [];
    //? set DocType
    case Types.DocType.set:
      return action.payload ?? [];
    // ? default
    default:
      return state;
  }
};

export default reducer;
