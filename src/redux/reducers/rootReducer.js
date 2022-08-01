// ** Redux Imports
import { combineReducers } from 'redux';

// ** Reducers Imports
import auth from './auth';
import layout from './layout';
import tempData from './tempData';
import Offline from './App/Offline';
import Entry from './App/Entry'
const rootReducer = combineReducers({
  ...Entry,
  Offline,
  auth,
  layout,
  tempData,
});

export default rootReducer;
