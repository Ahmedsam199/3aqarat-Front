import Types from '@Types';
import Router from '@src/router/Router';
// ** Initial State
const initialState = {
  network: false,
  row: null,
  searchValue: '',
};

const tempDataReducer = (state = initialState, action) => {
  if (action.type)
    switch (action.type) {
      case Types.ChangeNetworkStatus:
        return { ...state, network: action.payload };
      case Types.ChangeRow:
        return { ...state, row: action.payload };
      case Types.SetSearchValue:
        return { ...state, searchValue: action.payload };
      default:
        return state;
    }
};

export default tempDataReducer;
