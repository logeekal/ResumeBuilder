import {createStore} from 'redux';
import reducers from '../reducers';
import {devToolsEnhancer} from 'redux-devtools-extension'
import { loadState, saveState } from './cachingMiddleware';


const preloadedState = loadState();
export const store = createStore(reducers, preloadedState,  devToolsEnhancer(
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  ));
  
store.subscribe(()=>{
  let state = store.getState();
  
 console.log({state});
  saveState({
    ...state
  })
})