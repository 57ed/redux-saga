import { combineReducers } from 'redux';
import usersReducer from './reducers';

const rootReducer = combineReducers({
  data: usersReducer
});

export default rootReducer;
