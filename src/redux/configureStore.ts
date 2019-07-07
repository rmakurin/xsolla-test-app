import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import chartReducer from './reducers/chartReducer';
import tableReducer from './reducers/tableReducer';

export default function(initialState = {}) {
  const rootReducer = combineReducers({
    chart: chartReducer,
    table: tableReducer
  });

  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
