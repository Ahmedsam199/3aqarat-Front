// ** Redux Imports
import { combineReducers } from 'redux';
// ** Reducers Imports
import auth from './auth';
import layout from './layout';
import tempData from './tempData';
import Offline from './App/Offline';
import Online from "./App/Online";
import Attachment from "@Component/Attachment/store/reducer/attachments";
import Attachment2 from "@Component/Attachment2/store/reducer/attachments";

const rootReducer = combineReducers({
  ...Online,
  Offline,
  auth,
  layout,
  Attachment,
  Attachment2,
  tempData,
});
export default rootReducer;
