import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "./store/contexts/SettingsContext";
import { BrowserRouter } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { CollapseDrawerProvider } from "./store/contexts/CollapseDrawerContext";
import { store } from "./store/redux/store";
import ThemeConfig from "./theme";
import ThemePrimaryColor from "./common/ThemePrimaryColor";

//routes
import Router from "./routes";

function App() {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <Provider store={store}>
              <ThemeConfig>
                <ThemePrimaryColor>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Router />
                  </LocalizationProvider>
                </ThemePrimaryColor>
              </ThemeConfig>
              <ToastContainer />
            </Provider>
          </BrowserRouter>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
