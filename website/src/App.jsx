import React from "react";
import ThemeConfig from "./theme";
import Settings from "./common/settings";
import ThemePrimaryColor from "./common/ThemePrimaryColor";
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
