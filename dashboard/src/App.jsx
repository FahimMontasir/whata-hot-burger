import React from "react";
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
        <Router />
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}

export default App;
