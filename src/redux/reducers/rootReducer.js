// ** Redux Imports
import { combineReducers } from 'redux';

// ** Reducers Imports
import auth from './auth';
import layout from './layout';
import tempData from './tempData';
import Offline from './App/Offline';
import Entry from './App/Entry'
import Attachment from "@Component/Attachment/store/reducer/attachments"; 

const rootReducer = combineReducers({
  ...Entry,
  Offline,
  auth,
  layout,
  Attachment,
  tempData,
});
console.log("first", Attachment);
export default rootReducer;
