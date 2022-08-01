// import axios from 'axios';
// import { ErrorToast } from '../../components/ErrorToast';
// import { toast } from 'react-toastify';
// import { getIntlMessage } from 'react-intl'
// import i18n from 'i18next'
// import db from '../api/cacheDB';
// const { getCurrentWindow } = require('electron').remote;

// const LogOut = async () => {
//     await Promise.all([
//         localStorage.removeItem('accessToken'),
//         localStorage.removeItem('refreshToken '),
//         localStorage.removeItem('userData'),
//         db.table('cache').clear(),
//         getCurrentWindow().reload()
//     ])
// }
// const apiClient = axios.create({
//     //   baseURL: 'https://api.aljazary.com/api/v1',
//     // timeout: 1000,
//     // headers: { 'X-Custom-Header': 'foobar' }
// });

// apiClient.interceptors.request.use((request) => {
//     let accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//         accessToken = accessToken.replace(/"/g, '')
//         // request.headers.Authorization = `Bearer ${accessToken}`
//         request.headers.jwt = accessToken;
//         // console.log('access', accessToken);

//     }
//     return request;
// });

// apiClient.interceptors.response.use(
//     // Response handling
//     (response) => {
//         const { data } = response;
//         if (Array.isArray(data) && data.length === 2) {
//             const { ReturnValue } = data;
//             if (ReturnValue && ReturnValue !== 0) {
//                 const { ResultString } = data;
//                 const json = JSON.parse(ResultString);
//                 toast.error(<ErrorToast msg={json.Error_Message} />, {
//                     hideProgressBar: true,
//                 });
//                 return false;
//             }
//         }
//         return response;
//     },
//     (error) => {
//         // Errors handling
//         const { response } = error;
//         // const { status } = response
//         // const { message } = response.data;
//         switch (response?.status) {
//             case 547:
//                 toast.error(<ErrorToast msg={i18n.t("depending on")}
//                 />, {
//                     hideProgressBar: true,
//                 });
//                 break;
//             case 400:
//                 toast.error(<ErrorToast msg={i18n.t("bad request")} />, {
//                     hideProgressBar: true,
//                 });
//                 break;
//             case 401:
//                 LogOut()
//                 break;
//             case 415:
//                 toast.error(<ErrorToast msg={i18n.t("duplicate data")} />, {
//                     hideProgressBar: true,
//                 });
//                 break;
//             default: break;
//         }
//         return false;
//     }
// );

// export default apiClient;
