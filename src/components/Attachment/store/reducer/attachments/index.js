import Types from "@Types";

export default (state = [], action) => {
  switch (action.type) {
    case Types.Attachments.set:
      return action.payload;
    case Types.Attachments.add:
      return [...state, action.payload];
    case Types.Attachments.delete:
      return [...state.filter((x) => x.Series !== action.payload)];
    case Types.Attachments.clear:
      return [];
    default:
      return state;
  }
};
