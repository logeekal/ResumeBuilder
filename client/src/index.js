import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import { store } from './state';
import App from './App';


const render = () => {
  console.log(`Rending the state first`);
  console.log(store.getState());
  ReactDOM.render(<App />, document.getElementById("root"));
};

store.subscribe(render);

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
