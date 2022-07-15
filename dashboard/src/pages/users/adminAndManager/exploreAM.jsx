import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { Button, Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../common/Page";
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import AMList from "./components/explore/AMList";
import SearchAM from "./components/explore/search/Box";

export default function ExploreAmPage() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Explore Admin & Manager">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Explore"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Admin & Manager", href: PATH_DASHBOARD.am.root },
            { name: "Explore" },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.am.register}
              startIcon={<Icon icon={plusFill} />}
            >
              Register Manager
            </Button>
          }
        />
        <SearchAM />
        <AMList />
      </Container>
    </Page>
  );
}
