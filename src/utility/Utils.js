import Sugar from "sugar";
import HashMap from "hashmap";
import { t } from "i18next";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import { toasty } from "@toast";

import { DefaultRoute } from "../router/routes";

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") return DefaultRoute;
  if (userRole === "client") return "/access-control";
  return "/login";
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});

export const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const resetState = ({ setState }) => {
  setState((state) => {
    const keys = Object.keys(state);
    for (const key of keys) state[key] = null;
    return { ...state };
  });
};
export const initState = ({ setState, data }) => {
  setState((state) => {
    const keys = Object.keys(state);
    for (const key of keys) state[key] = data[key];
    return { ...state };
  });
};
export const stringToCapitalize = ([first, ...rest]) => {
  return first.toUpperCase() + rest.join("");
};

export function parseISOString(s) {
  if (s === "") s = new Date().toISOString();
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
export const parseNumber = (value) => {
  // const _ = Math.abs(
  //   +(typeof value === 'string'
  //     ? value?.replaceAll(',', '')?.replaceAll(' ', '')
  //     : value)
  // );
  const _ = +(typeof value === "string"
    ? value?.replaceAll(",", "")?.replaceAll(" ", "")
    : value);
  return isNaN(_) ? 0 : _;
};
export const compareArray = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

// ! help
String.prototype.replaceBetween = function (start, end, what) {
  return this.substring(0, start) + what + this.substring(end);
};
const date = new Date();
export const LOCALE_TIME_ZONE = date
  .toString()
  .substring(
    date.toString().search(/GMT/g) + 3,
    date.toString().search(/GMT/g) + 8
  )
  .replaceBetween(3, 3, ":");

export const ScrollToTop = () => {
  setTimeout(() => {
    const mainContentScrollTop = document.querySelector(
      ".container-after-titlebar"
    );
    mainContentScrollTop.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, 500);
};
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && !value.length) ||
    (value instanceof Object && Sugar.Object.isEmpty(value))
  );
};
// redux
import Routes from "@Routes";
import { syncData } from "@store/actions/data";
import { resolve } from "path";
import axios from "axios";
import { SuccessToast } from "../components/SuccessToast";
import { toast } from "react-toastify";
import { getCurrencyExchangeRate } from "../redux/actions/helper";
export const onSyncData = (dispatch) => {
  const keys = Object.keys(Routes);
  keys.forEach((x) => {
    if (Routes[x].root) dispatch(syncData(x));
  });
};
export const toBoolean = (value) => {
  if (typeof value !== "string") return value;
  switch (value.toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;

    case "false":
    case "no":
    case "0":
    case null:
      return false;

    default:
      return Boolean(value);
  }
};
export const toISOString = (date) => {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? "0" : "") + norm;
    };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds())
  );
};

export const paginateArray = (array, perPage, page) =>
  array.slice((page - 1) * perPage, page * perPage);

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
export const addDays = (date, number) => {
  const _ = new Date(date.addDays(number));
  return date.addDays(number);
};
Date.prototype.addMonths = function (months) {
  const date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};
export const addMonths = (date, number) => {
  return date.addMonths(number);
};
Date.prototype.subMonths = function (months) {
  const date = new Date(this.valueOf());
  date.setMonth(date.getMonth() - months);
  return date;
};
export const subMonths = (date, number) => {
  return date.subMonths(number);
};
export const isNumber = (number) => {
  return typeof number === "number";
};

export const sliceString = (str, length = 10) => {
  return str.length > length ? `${str.slice(0, length)}...` : str;
};
export const compared = (val1, val2, res1 = true, res2 = false) => {
  return val1 === val2 ? res1 : res2;
};

export const deepCopy = (value) => {
  return JSON.parse(JSON.stringify(value));
};
export const isArray = (val) => {
  return Array.isArray(val);
};
export const getDistinctDataFromArray = (array, getValue) => {
  return [...new Set(array.map((x) => getValue(x)))];
};
export const convertObjectToParam = (value) => {
  let _params = "";
  const keys = Object.keys(value);
  const values = Object.values(value);
  keys.forEach((x, i) => {
    if (!isEmpty(values[i]))
      _params += `${i !== 0 ? "&" : "?"}${x}=${values[i]}`;
  });
  return _params;
};
export const statusObj = {
  draft: "light-success",
  submitted: "light-warning",
  cancelled: "light-danger",
};
export const findValue = ({ array = [], name = "Series", value = "" }) => {
  try {
    return array.find((x) => x[name] === value);
  } catch (e) {
    console.error("hacker_it error", e);
  }
};
export const parseStringToJSON = (string) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    // return []
    return false;
  }
};
export const isValidDate = (date) => {
  return (
    date &&
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date)
  );
};
// export const clearDefaultValueOfArray = ({ name, control, reset }) => {
//   return
//   // console.log("hacker_it", control.defaultValuesRef?.current)
//   if (control.defaultValuesRef?.current[`${name}`]?.length > 0)
//     reset(`${name}`)
// }
export const getDate = (date) => {
  return isValidDate(date)
    ? date.toISOString().split("T")[0]
    : date?.split("T")[0];
};
export const fixDuplicateOptions = {
  init: ({
    selections = [],
    selected_ID = "Series",
    data = [],
    data_ID = "Series",
  }) => {
    try {
      const _data = deepCopy(data);
      const _selectionsSeries = selections.map((x) => x[`${selected_ID}`]);
      return _data.filter((x) => !_selectionsSeries.includes(x[`${data_ID}`]));
    } catch (e) {
      console.error("hacker_it error", e);
    }
  },
};

export const ObjectToString = (data) => {
  return JSON.stringify(data ?? "");
};

export const clearDefaultValueOfArray = ({ name, control, reset, index }) => {
  // if (control.defaultValuesRef?.current[`${name}`]?.length > 0) {
  //   const _ = control.defaultValuesRef?.current[`${name}`].slice(index, 1)
  //   reset({ ...control.defaultValuesRef?.current, [`${name}`]: _ })
  // } else
  reset({ [`${name}`]: [] });
};
export const setValueToArray = ({
  array,
  name = "OriginalQty",
  from = "Qty",
  value = undefined,
  setValue = undefined,
}) => {
  return array.map((x) => ({
    ...x,
    [name]: value ?? setValue(x) ?? x[`${from}`],
  }));
};
export const checkFormatTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

export const getTimeAsString = (date) => {
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  // add a zero in front of numbers<10
  h = checkFormatTime(h);
  m = checkFormatTime(m);
  s = checkFormatTime(s);
  return `${h}:${m}:${s}`;
};
const getDateAsString = (date) => {
  return Sugar.Date.format(new Date(date), "%Y-%m-%d");
};
export const sendTime = (date) => {
  const _date = isValidDate(date) ? date : new Date(date);
  return `${getDateAsString(_date)}T${getTimeAsString(_date)}.000Z`;
};
export const receiptTime = (date) => {
  const _date = /Z/.test(date) ? date.slice(0, date.length - 1) : date;
  return [new Date(_date)];
};
export const arrToHashMap = (arr, val = "Series") => {
  const map = new HashMap();
  arr.forEach((x) => {
    map.set(x[val], x);
  });
  return map;
};
export const isNullOrUndefined = (val) => {
  return val === null || val === undefined;
};
export const getTotalDiscount = ({ DiscountOn, Total, DiscountAmount }) => {
  return DiscountOn === "Percent"
    ? (DiscountAmount * Total) / 100
    : DiscountAmount;
};
export const getToday = () => {
  const today = new Date();
  return today.getTime();
};
export const secondsIsLeftToStartNewDate = () => {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var secondsUntilEndOfDate = 24 * 60 * 60 - h * 60 * 60 - m * 60 - s;
  return secondsUntilEndOfDate;
};
const getTime = (val) => {
  const _ = new Date(val);
  return _.getTime();
};
// #region offer
export const filterPricingRulesHasOfferOnThisDay = (arr) =>
  deepCopy(arr).filter(
    (item) =>
      getTime(item.FromDate) <= getToday() && getTime(item.ToDate) >= getToday()
  );
const findHighPriorityOffer = (hasOffer) => {
  const _Priority = hasOffer.map((x) => x.Priority);
  const minimumPriority = Math.min.apply(null, _Priority);
  return hasOffer.find((x) => x.Priority == minimumPriority);
};
const offerCheck = {
  Qty: (Qty, offer) => Qty >= offer.MinQty && Qty <= offer.MaxQty,
  Item: (item, offer) => !!offer.Item && offer.Item === item.Series,
  Group: (item, offer) =>
    !!offer.ItemGroup && offer.ItemGroup === item.ItemGroupSeries,
};
const findItemOffer = ({ OffersToday, item, Qty }) => {
  return OffersToday.filter(
    (x) =>
      (offerCheck.Item(item, x) || offerCheck.Group(item, x)) &&
      offerCheck.Qty(Qty, x)
  );
};
export const findOffer = ({ OffersToday, item, Qty }) => {
  const hasOffer = findItemOffer({ OffersToday, item, Qty });
  return findHighPriorityOffer(hasOffer);
};
export const calcOfferDiscountAmount = ({
  offer,
  baseCost,
  Currency,
  dispatch,
}) => {
  return offer
    ? calcTotalDiscountAmount({
        Total: baseCost,
        DiscountON: offer.DiscountON,
        DiscountAmt: +offer.DiscountAmt,
        Currency,
        dispatch,
      })
    : 0;
};
export const calcTotalDiscountAmount = ({
  DiscountON,
  DiscountAmt,
  Total,
  Currency,
  dispatch,
}) => {
  return +DiscountON
    ? getDiscountAmount({ DiscountAmt: +DiscountAmt, Currency, dispatch })
    : (+Total * DiscountAmt) / 100;
};
const getDiscountAmount = async ({ DiscountAmt, Currency, dispatch }) => {
  const exchange = await dispatch(
    getCurrencyExchangeRate({ from: Currency, showError: false })
  );
  return DiscountAmt * exchange;
};
// #endregion
let timeID;
export const sleep = (timeout = 100) => {
  return new Promise(async (resolve) => {
    clearTimeout(timeID);
    timeID = await setTimeout(() => {
      resolve();
    }, timeout);
  });
};

export const checkDateFromRange = ({ value, range }) => {
  const d = new Date(value);
  const d1 = new Date(range[0]);
  const d2 = addDays(new Date(range[1]), 1);
  return d.getTime() >= d1.getTime() && d.getTime() <= d2.getTime();
};
// const convertFilterDate = (filter) => {
//   const _tempFilter = deepCopy(filters);
//   const Keys = Object.keys(filter);
//   Keys.forEach((x) => {
//     /date|year/.test(x.toLocaleLowerCase())
//       ? (_tempFilter[x] = _tempFilter[x][0])
//       : null;
//   });
//   return _tempFilter;
// };
export const checkDateValue = (data) => {
  try {
    const _data = deepCopy(data);
    const Keys = Object.keys(_data);
    Keys.forEach((x) => {
      /date/.test(x.toLocaleLowerCase())
        ? (_data[x] = sendTime(_data[x][0]))
        : null;
    });
    return _data;
  } catch (error) {
    console.error("hacker_it error", error);
  }
};
export const changeDateFormat = (date) => {
  const _date = new Date(date.slice(0, date.length - 1));
  return `${_date?.toLocaleDateString()}-${_date?.toLocaleTimeString()}`;
};
export const fixValue = (data) => {
  if (typeof data === "boolean") return data ? "true" : "false";
  if (typeof data === "number") return data.toFixed(2);
  if (checkTime(data)) return changeDateFormat(data);
  if (typeof data === "string") return data;
  return "";
};
export const checkTime = (data) => {
  return /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(
    data
  );
};

export const handleScroll = (ref) => {
  const TitleTable = document.querySelector("#TitleTable");
  const mainContentScrollTop = document.querySelector(
    ".container-after-titlebar"
  );
  switch (true) {
    case mainContentScrollTop.scrollTop > TitleTable?.offsetTop + 315:
      ref.current.style.position = "fixed";
      ref.current.style.zIndex = "100";
      ref.current.style.top = "95px";
      ref.current.style.width = "92%";
      break;
    case mainContentScrollTop.scrollTop < TitleTable?.offsetTop + 290:
      ref.current.style.position = "relative";
      ref.current.style.zIndex = "0";
      break;
    default:
      break;
  }
};
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
export const getTotalRows = ({ data, ignoreTotalKeys }) =>
  Object.fromEntries(
    Object.entries(data[0]).map(function ([key, val], i) {
      return [
        key,
        !ignoreTotalKeys.includes(key) && (!!val || val === 0) && !isNaN(+val)
          ? data.reduce((sum, row) => +row[key] + sum, 0).toFixed(2)
          : "_",
      ];
    })
  );
export const removeNullValue = (data) => {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
};
export const buildHTMLTable = (data) => {
  const _keys = Object.keys(data[0]);
  const Tbl = document.createElement("table");
  const Tbody = document.createElement("tbody");
  // add header for table
  const Tr = Tbl.insertRow();
  for (let j = 0; j < _keys.length; j++) {
    const Td = Tr.insertCell();
    Td.appendChild(document.createTextNode(t(_keys[j])));
    Tr.appendChild(Td);
  }
  // add body for  table
  for (let i = 0; i < data.length; i++) {
    const Tr = Tbl.insertRow();
    for (let j = 0; j < _keys.length; j++) {
      const Td = Tr.insertCell();
      Td.appendChild(document.createTextNode(fixValue(data[i][_keys[j]])));
      Tr.appendChild(Td);
    }
    Tbody.appendChild(Tr);
  }
  Tbl.appendChild(Tbody);
  return Tbl;
};

const downloadAndDelete = ({
  data,
  refDoctype,
  deleteDispatchFn,
  dispatch,
  refSeries,
}) => {
  const filePaths = data?.rows?.map((x) => x?.FilePath);
  const fileOriginalNames = data?.rows?.map((x) => x?.OriginalFileName);
  let zip = new JSZip();
  const imagesFolder = zip.folder(refDoctype);

  let requests = filePaths.map((path) =>
    fetch(`${Routes.Attachments.AmazonS3}/${path}`, {
      responseType: "arraybuffer",
    }).then((r) => r.blob())
  );

  requests.forEach((imgBlob, index) => {
    imagesFolder.file(fileOriginalNames[index], imgBlob, {
      blob: true,
    });
  });

  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, `${refDoctype}.zip`);
  });

  Promise.allSettled(requests).then((res) => {
    // Delete record and then delete attachmnets
    dispatch(deleteDispatchFn(refDoctype, refSeries))
      .then((res) => {
        axios
          .delete(
            `${Routes.Attachments.delete}?refDoctype=${refDoctype}&refSeries=${refSeries}`
          )
          .then(() => {});
        toast.success(<SuccessToast msg="Delete Successfully!" />, {
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(`hacker_it_error ${refDoctype}`, err);
      });
  });
};

const deleteRecordAndAttachment = ({
  dispatch,
  deleteDispatchFn,
  refDoctype,
  refSeries,
}) => {
  dispatch(deleteDispatchFn(refDoctype, refSeries))
    .then((res) => {
      axios
        .delete(
          `${Routes.Attachments.delete}?refDoctype=${refDoctype}&refSeries=${refSeries}`
        )
        .then(() => {});

      toast.success(<SuccessToast msg="Delete Successfully!" />, {
        hideProgressBar: true,
      });
    })
    .catch((err) => {
      console.log(`hacker_it_error ${refDoctype}`, err);
    });
};

const deleteRecord = ({
  dispatch,
  deleteDispatchFn,
  refDoctype,
  refSeries,
}) => {
  dispatch(deleteDispatchFn(refDoctype, refSeries))
    .then((res) => {
      toast.success(<SuccessToast msg="Delete Successfully!" />, {
        hideProgressBar: true,
      });
    })
    .catch((err) => {
      console.log(`hacker_it_error ${refDoctype}`, err);
    });
};

export const deleteRecordWithAttachments = ({
  refDoctype,
  refSeries,
  dispatch,
  deleteDispatchFn,
}) => {
  axios
    .get(
      `${Routes.Attachments.read}?RefDoctype=${refDoctype}&RefSeries=${refSeries}`
    )
    .then(({ data }) => {
      if (data?.rows && data?.rows?.length > 0) {
        Swal.fire({
          title: `You have ${data?.rows?.length} attachment on this record!`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Download attachments",
          denyButtonText: `Delete Anyway`,
        }).then((result) => {
          if (result.isConfirmed) {
            downloadAndDelete({
              data,
              refDoctype,
              deleteDispatchFn,
              dispatch,
              refSeries,
            });
          } else if (result.isDenied) {
            deleteRecordAndAttachment({
              dispatch,
              deleteDispatchFn,
              refDoctype,
              refSeries,
            });
          }
        });
      } else {
        deleteRecord({
          dispatch,
          deleteDispatchFn,
          refDoctype,
          refSeries,
        });
      }
    })
    .catch((err) => console.log("Joseph err attachment"));
};

export const sendAttachment = ({
  files = [],
  refDoctype = "",
  refSeries = "",
}) => {
  let formData = new FormData();
  files.forEach((img) => {
    formData.append("image", img);
  });

  axios.post(
    `${Routes.Attachments.upload}?refDoctype=${refDoctype}&refSeries=${refSeries}`,
    formData
  );
};

export const listFonts = () => {
  let { fonts } = document;
  const it = fonts.entries();

  let arr = [];
  let done = false;

  while (!done) {
    const font = it.next();
    if (!font.done) {
      arr.push(font.value[0].family);
    } else {
      done = font.done;
    }
  }
  // converted to set then arr to filter repetitive values
  return [...new Set(arr)];
};
export const checkDiscountAmtNotValid = (data) => {
  if (data.DiscountAmt > data.Total && data.DiscountBy === "Amount") {
    toasty({
      type: "warning",
      msg: "Discount greater then Total, change please!",
    });
    return true;
  } else return false;
};

/**
 *
 * @param  arr
 * @param  x
 * @returns object
 */
export const getAttributFromObject = (x,arr) => {
  return arr
    .map((y) => {
      return { [y]: x[y] };
    })
    .reduce((x, s) => ({ ...s, ...x }), {});
};
