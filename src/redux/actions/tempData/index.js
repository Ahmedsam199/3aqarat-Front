import Types from '@Types';

export const setNetwork = (status) => {
  return async (dispatch) => {
    dispatch({
      type: Types.ChangeNetworkStatus,
      payload: status,
    });
  };
};
export const changeRow = (status) => {
  return async (dispatch) => {
    dispatch({
      type: Types.ChangeRow,
      payload: status,
    });
  };
};
export const setSearchValue = (value) => {
  return async (dispatch) => {
    dispatch({
      type: Types.SetSearchValue,
      payload: value,
    });
  };
};
