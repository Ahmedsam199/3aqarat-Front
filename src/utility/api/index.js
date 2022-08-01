const { default: apiClient } = require('../axios');
import axios from 'axios';
import { toast } from 'react-toastify';
import { ErrorToast } from '../../components/ErrorToast';
import db from './cacheDB';

export const get = async (
  url,
  params,
  posparams = undefined
) => {
  const d = await apiClient.get(url, posparams ? posparams : null);
  return d;
};

export const insert = async (
  url,
  params,
  offlineCallback,
  rest = undefined,
  offlineParams = undefined,
  isprint = false
) => {
  // const isOnline = useNetwork();
  // console.log('Internet status', isOnline);
  if (true) {
    const d = await apiClient.post(url, params, rest);
    // console.log('print', isprint);
    if (isprint) {
      console.log(params);
    }
    return d;
  } else {
    // console.log('offlineParams', offlineParams);
    // const data = offlineCallback(offlineParams ? offlineParams : params).then(
    //   (result) => {
    //     console.log('Offline Results', result);
    //     if (result.number === undefined) return result;
    //     else
    //       toast.error(<ErrorToast msg={result.message} />, {
    //         hideProgressBar: true,
    //       });
    //   }
    // );
    // console.log('It is Offline', data);
    // return data;
  }
};

export const insertItemAPI = async (
  url,
  params,
  offlineCallback,
  rest = undefined,
  offlineParams = undefined
) => {
  // console.log('Internet status', navigator.onLine);
  if (true) {
    const _formData = new FormData();
    _formData.append('image', params.image);
    _formData.append('json', params.json);
    const d = await apiClient.post(url, _formData, rest);
    return d;
  } else {
  }
};
export const insertOrUpdateFormData = async ({
  url,
  values,
  nameFile,
  file,
}) => {
  const formData = new FormData()
  const keys = Object.keys(values)
  const _values = Object.values(values)
  for (let i = 0; i < keys.length; i++) {
    formData.append(`${keys[i]}`, _values[i])
  }
  formData.append(`${nameFile}`, file)
  const d = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return d;
};

export const update = async (
  url,
  params,
  offlineCallback,
  rest = undefined,
  offlineParams = undefined
) => {
  // console.log('Internet status', navigator.onLine);
  if (true) {
    const d = await apiClient.post(url, params, rest);
    return d;
  } else {
  }
};

export const updateItemAPI = async (
  url,
  params,
  offlineCallback,
  rest = undefined,
  offlineParams = undefined
) => {
  // console.log('Internet status', navigator.onLine);
  if (true) {
    const _formData = new FormData();
    _formData.append('image', params.image);
    _formData.append('json', params.json);
    const d = await apiClient.post(url, _formData, rest);
    return d;
  } else {
  }
};

export const deletee = async (url, params, offlineCallback) => {
  const d = await apiClient.delete(url, { data: params });
  return d;
};
