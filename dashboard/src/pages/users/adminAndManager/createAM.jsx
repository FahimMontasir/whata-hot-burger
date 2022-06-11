// material
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../common/Page";
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import AMForm from "./components/form/AMForm";

export default function CreateAm() {
  const { themeStretch } = useSettings();

  return (
    <Page title="AM: Create a new manager">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={"Create a new user"}
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Admin & Manager", href: PATH_DASHBOARD.am.root },
            { name: "Register" },
          ]}
        />

        <AMForm />
      </Container>
    </Page>
  );
}
