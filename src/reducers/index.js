import { combineReducers } from 'redux';
import session from './session';
import user from './user';
import news from './news';

export default combineReducers({
  session,
  user,
  news,
});
