import {createStore} from 'redux';
import reducers from '../reducers';
import {devToolsEnhancer} from 'redux-devtools-extension'

export const store = createStore(reducers,/* preloadedState, */ devToolsEnhancer(
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  ));
//console.log(store.getState());