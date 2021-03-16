import { combineReducers } from 'redux';
import {alert} from './alert';
import {auth} from './auth';
import {product} from './product';
import {employee} from './employee';
import {user} from './user';
export default combineReducers({
  alert,
  auth,
  product,
  employee,
  user
});