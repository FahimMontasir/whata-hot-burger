import { useLocation } from "react-router-dom";
// material
import { Typography, Grid, Stack } from "@mui/material";
//components
import FollowerReact from "./FollowerAndReact";
import About from "./About";

export default function Profile() {
  const { state } = useLocation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <FollowerReact />
          <About profile={state} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography variant="h2">Personal blog will be here!</Typography>
      </Grid>
    </Grid>
  );
}
