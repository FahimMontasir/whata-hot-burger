import { useMemo } from "react";
// material
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
// hooks
import useSettings from "../hooks/useSettings";
//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";

export default function ThemeConfig({ children }) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: "light" }
        : { ...palette.dark, mode: "dark" },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
