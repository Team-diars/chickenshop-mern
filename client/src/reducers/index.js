import { combineReducers } from 'redux';
import {alert} from './alert';
import {auth} from './auth';
import {product} from './product';
import {employee} from './employee';
import {user} from './user';
import {ticket} from './ticket';
import {sale} from './sale';
import {settings} from './settings';
export default combineReducers({
  alert,
  auth,
  product,
  employee,
  user,
  settings,
  ticket,
  sale
});