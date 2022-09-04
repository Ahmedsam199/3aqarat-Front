import Routes from "@Routes";
import db from '@src/utility/api/cacheDB';
import { store } from "../../storeConfig/store";
import Types from "@Types";
import axios from "axios";
import { insertOrUpdateFormData } from "@utility/api";
import { v4 as uuidv4 } from "uuid";
import { types } from "sass";
const networkStatus = () => store.getState().tempData.network;
/*
!  server and locale
 * * ***CRUD***
 */
/**
 *
 * @param {name,Object} name insertItem
 * that Object without Series
 * @returns null
 */
export const insertItem = (name, values) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (networkStatus()) {
          const _ = await axios.post(Routes[name].root, values);
          console.log('testing',_);
          if ( _.status ==201) {
   //Cause IHAVE DATA FROM SOCKET I COMMENT THIS FUNCTION 

            // dispatch({
            //   type: Types[name]?.insert,
            //   payload: {
            //     value: { ...values,Series:_.data.Series},
            //   },
            // });
            resolve({ Series: _?.data?.Series ?? true });
          } else {
            reject(_);
          }
          } else {
          const _ = uuidv4();
          const request = {
            timestamp: new Date().toUTCString(),
            synced: false,
            request: JSON.stringify({
              ...values,
              Remarks: `${values.Remarks} offline_ID:${_}`,
            }),
            response: undefined,
            url: Routes[name].root,
          };
          const res = await db.table('request').add(request);
          console.log("testing", Types.Offline[name]?.insert);
          dispatch({
            type: Types.Offline[name]?.insert,
            payload: {
              name: name,
              value: {
                ...values,
                Remarks: `${values.Remarks} offline_ID:${_}`,
                ID: res,
              },
            },
          });
          resolve({ ID: res });
        }
      } catch (e) {
        console.error("hacker_it error", e);
        reject(e);
      }
    });
  };
};
/**
 *
 * @param {name,Object} name insertItemByFormData
 * that Object without Series
 * @returns null
 */
export const insertItemByFormData = (name, values, file) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _ = await insertOrUpdateFormData({
          url: Routes[name].root,
          values,
          nameFile: "img",
          file,
        });
        if (_.status === 200) {
          dispatch({
            type: Types[name]?.insert,
            payload: {
              value: {
                ...values,
                IMG: _.data.image,
                Series: _.data.Series,
              },
            },
          });
          resolve(_);
        } else {
          reject(_);
        }
      } catch (e) {
        console.error("hacker_it error", e);
        reject(e);
      }
    });
  };
};
/**
 *
 * @param {name,Object} name updateItem
 * that Object with Series
 * @returns null
 */
export const updateItem = (name, values) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (networkStatus()) {
          const _ = await axios.put(`${Routes[name].root}/${values.Series}`, values);

          if (_.status == 201) {
            dispatch({
              type: Types[name]?.update,
              payload: {
                value: values,
                Series: values.Series,
              },
            });
            resolve({ Series: _?.data?.Series ?? true });
          } else {
            reject(_);
          }
        } else {
          // delete from cache
          // console.log("hacker_it", values.ID)
          // await db.table('request').update(+values.ID, {
          //   request: JSON.stringify({
          //     ...values,
          //   }),
          // });
          // update in redux
          dispatch({
            type: Types.Offline[name]?.update,
            payload: {
              value: values,
              ID: values.ID,
              name: name,
            },
          });
          resolve({ ID: values.ID });
        }
      } catch (e) {
        reject(e);
        console.error("hacker_it error", e);
      }
    });
  };
};
/**
 *
 * @param {name,Object} name updateItemByFormData
 * that Object without Series
 * @returns null
 */
export const updateItemByFormData = (name, values, file) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _ = await insertOrUpdateFormData({
          url: Routes[name].root,
          values,
          nameFile: "img",
          file,
        });
        if (_.status === 200) {
          dispatch({
            type: Types[name]?.update,
            payload: {
              name,
              value: {
                ...values,
                IMG: _.data.image,
              },
              Series: values.Series,
            },
          });
          resolve(_.status);
        } else {
          reject(_);
        }
      } catch (e) {
        reject(e);
        console.error("hacker_it error", e);
      }
    });
  };
};
/**
 *
 * @param {name,Series} name deleteItem
 * @returns null
 */
export const deleteItem = (name, Series) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (networkStatus()) {
          const _ = await axios.delete(`${Routes[name].root}/${Series}`);

          if (_.status === 200) {

            dispatch({
              type: Types[name]?.delete,
              payload: {
                Series,
              },
            });
            resolve(_.status);
          } else {
            reject(_ ?? "Error");
          }
        } else {
          // delete from from cache
          // await db.table('request').delete(+Series);
          // delete from redux
          dispatch({
            type: Types.Offline[name]?.delete,
            payload: {
              name: name,
              ID: Series,
            },
          });
          resolve(true);
        }
      } catch (e) {
        console.error("hacker_it error", e);
        reject(e);
      }
    });
  };
};
/*
 * *** Locale
 */
// set data locale
export const syncData = (name) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      const _ = await axios.get(`${Routes[name].root}?filters`);
      if (_.status === 200) {
        dispatch({
          type: Types[name]?.set,
          payload: _.data,
        });
        resolve(_.status);
      } else {
        reject(_);
      }
    });
  };
};
// clear locale
export const clearData = (name) => {
  return async (dispatch) => {
    dispatch({
      type: Types[name]?.clear,
      payload: {
        name,
      },
    });
  };
};
// clear All locale
export const clearAllData = () => {
  return async (dispatch) => {
    dispatch({
      type: Types.clear,
    });
  };
};

// ! *********** for Socket ***********
/**
 *
 * @param {name,Object} name insertItemLocal
 * that Object without Series
 * @returns null
 */
export const insertItemLocal = (name, values) => {
  return async (dispatch) => {
    dispatch({
      type: Types[name]?.insert,
      payload: {
        value: { ...values },
      },
    });
  };
};
/**
 *
 * @param {name,Object} name updateItemLocal
 * that Object with Series
 * @returns null
 */
export const updateItemLocal = (name, values) => {
  return async (dispatch) => {
    dispatch({
      type: Types[name]?.update,
      payload: {
        value: values,
        Series: values.Series,
      },
    });
  };
};
/**
 *
 * @param {name,Series} name deleteItemLocal
 * @returns null
 */
export const deleteItemLocal = (name, Series) => {
  return async (dispatch) => {
    dispatch({
      type: Types[name]?.delete,
      payload: {
        Series,
      },
    });
  };
};
