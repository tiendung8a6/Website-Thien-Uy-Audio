// import React from "react";
// import ReactDOM from "react-dom";
// import createRoot from react-dom/client
// import "./index.css";
// import App from "./App";
// import * as serviceWorker from "./serviceWorker";
// import { BrowserRouter } from "react-router-dom";
// import "antd/dist/antd.css";

// import { createStore } from "redux";
// import { Provider } from "react-redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./reducers";

// // import "@fortawesome/fontawesome-free/css/all.min.css";
// // store
// const store = createStore(rootReducer, composeWithDevTools());

// ReactDOM.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   // </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

// store
const store = createStore(rootReducer, composeWithDevTools());

// New way to render using createRoot
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// Service worker
serviceWorker.unregister();
