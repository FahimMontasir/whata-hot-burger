import { useLocation } from "react-router-dom";
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
  const { state } = useLocation();

  const { themeStretch } = useSettings();

  return (
    <Page
      title={state ? `AM: Update ${state.name}` : "AM: Create a new manager"}
    >
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={
            state
              ? `Update user by this email:${state?.email}`
              : "Create a new user"
          }
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Admin & Manager", href: PATH_DASHBOARD.am.root },
            { name: state ? "Update" : "Register" },
          ]}
        />

        <AMForm
          currentUser={state ? { ...state, password: "bypassPass" } : undefined}
          isEdit={state ? true : false}
        />
      </Container>
    </Page>
  );
}
