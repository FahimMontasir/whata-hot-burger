import React from "react";
import ThemeConfig from "./theme";
import Settings from "./common/settings";
import HomePage from "./pages/home";

function App() {
  return (
    <ThemeConfig>
      <Settings />
      <HomePage />
    </ThemeConfig>
  );
}

export default App;
