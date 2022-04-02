import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      transparent: string;
      primary: string;
      primaryDark: string;
      secondary: string;
      secondaryLite: string;
      black: string;
      blackLite: string;
      white: string;
      gray: string;
      grayDark: string;
      info: string;
      success: string;
      warning: string;
      danger: string;
      ripple: string;
    };
    typography: {
      size: {
        h1: string;
        h2: string;
        h3: string;
        caption: string;
        body: string;
      };
      color: {
        primary: string;
        secondary: string;
        heading: string;
        caption: string;
      };
    };
  }
}
