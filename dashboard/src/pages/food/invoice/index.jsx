// material
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../common/Page";
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import UserInvoice from "./components/UserInvoice";

export default function InvoicePage() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Consumer Invoices">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Consumer Invoices"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Food", href: PATH_DASHBOARD.food.root },
            { name: "Invoice" },
          ]}
        />
        <UserInvoice />
      </Container>
    </Page>
  );
}
