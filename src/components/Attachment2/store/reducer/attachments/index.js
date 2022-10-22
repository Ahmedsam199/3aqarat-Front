import Types from "@Types";

export default (state = [], action) => {
  switch (action.type) {
    case Types.Attachments2.set:
      return action.payload;
    case Types.Attachments2.add:
      return [...state, action.payload];
    case Types.Attachments2.delete:
      return [...state.filter((x) => x.Series !== action.payload)];
    case Types.Attachments2.clear:
      return [];
    default:
      return state;
  }
};
