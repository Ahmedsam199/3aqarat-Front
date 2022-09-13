// ** Redux Imports
import { combineReducers } from 'redux';
// ** Reducers Imports
import auth from './auth';
import layout from './layout';
import tempData from './tempData';
import Offline from './App/Offline';
import Online from "./App/Online";
import Attachment from "@Component/Attachment/store/reducer/attachments";

const rootReducer = combineReducers({
  ...Online,
  Offline,
  auth,
  layout,
  Attachment,
  tempData,
});
export default rootReducer;
