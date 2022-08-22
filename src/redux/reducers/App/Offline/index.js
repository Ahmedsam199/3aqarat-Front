import Types from '@Types'
const initSate = {
  Order: [],
  StockEntry: [],
  Payment: [],
  Contract_Contract: [],
};
const reducer = (state = initSate, action) => {
  switch (action.type) {
    //? inset 
    case Types.Offline[action?.payload?.name]?.insert:
      return {
        ...state,
        [action.payload.name]:
          [
            ...state[action.payload.name],
            action.payload.value
          ]
      }
    //? update 
    case Types.Offline[action?.payload?.name]?.update:
      return {
        ...state,
        [action.payload.name]:
          state[action.payload.name].
            map(x =>
              x.ID == action.payload.ID ?
                action.payload.value :
                x
            )
      }
    //? delete 
    case Types.Offline[action?.payload?.name]?.delete:
      return {
        ...state,
        [action.payload.name]:
          state[action.payload.name].filter(x => x.ID !== action.payload.ID)
      }
    // ? clear all data
    case Types.Offline[action?.payload?.name]?.clear:
      return {
        ...state, [action.payload.name]: []
      }
    case Types.clear:
      return initSate
    // ? default
    default:
      return state
  }
}

export default reducer
