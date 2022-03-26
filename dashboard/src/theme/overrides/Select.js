import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

export default function Select(theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRoundedIcon,
      },

      styleOverrides: {
        root: {},
      },
    },
  };
}
