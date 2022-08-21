// material
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../common/Page";
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import UserCats from "./components/UserCarts";

export default function CartDetails() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Consumer Carts">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Consumer Carts"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Food", href: PATH_DASHBOARD.food.root },
            { name: "Cart" },
          ]}
        />
        <UserCats />
      </Container>
    </Page>
  );
}
