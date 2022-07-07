import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ThemeConfig from "./theme";
import ThemePrimaryColor from "./common/ThemePrimaryColor";
//
import Settings from "./common/settings";
//routes
import Router from "./routes";

function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <Settings />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router />
        </LocalizationProvider>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}

export default App;
