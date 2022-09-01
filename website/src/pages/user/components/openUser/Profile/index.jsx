import { useLocation } from "react-router-dom";
// material
import { Grid, Stack } from "@mui/material";
//components
import CommentReact from "./CommentAndReact";
import About from "./About";
import Cart from "./Cart";

export default function Profile() {
  const { state } = useLocation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <CommentReact />
          <About profile={state} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Cart id={state._id} />
      </Grid>
    </Grid>
  );
}
