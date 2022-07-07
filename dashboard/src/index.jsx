// scroll bar
import "simplebar/src/simplebar.css";
import "react-toastify/dist/ReactToastify.min.css";

import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "./store/contexts/SettingsContext";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { CollapseDrawerProvider } from "./store/contexts/CollapseDrawerContext";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import App from "./App";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <Provider store={store}>
              <App />
              <ToastContainer />
            </Provider>
          </BrowserRouter>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
