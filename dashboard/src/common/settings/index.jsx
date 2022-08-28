// material
import { Typography, Stack } from "@mui/material";
//
import Scrollbar from "../Scrollbar";
import SettingMode from "./SettingMode";
import SettingColor from "./SettingColor";
import SettingStretch from "./SettingStretch";
import SettingFullscreen from "./SettingFullscreen";

export default function Settings() {
  return (
    <Scrollbar sx={{ height: 1 }}>
      <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Stretch</Typography>
          <SettingStretch />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Mode</Typography>
          <SettingMode />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Color</Typography>
          <SettingColor />
        </Stack>

        <SettingFullscreen />
      </Stack>
    </Scrollbar>
  );
}
