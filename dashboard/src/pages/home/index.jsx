// material
import { Container, Grid } from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../common/Page";
import {
  EcommerceWelcome,
  EcommerceProductSold,
  EcommerceSalesProfit,
  EcommerceTotalBalance,
} from "./components";

export default function GeneralEcommerce() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Dashboard | Whata Hot Burger">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <EcommerceWelcome />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceProductSold />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceTotalBalance />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceSalesProfit />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
