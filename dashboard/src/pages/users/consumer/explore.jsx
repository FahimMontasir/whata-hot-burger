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
import ConsumerList from "./components/explore/ConsumerList";
import SearchConsumer from "./components/explore/search/Box";

export default function Explore() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Explore Consumer">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Explore"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Consumer", href: PATH_DASHBOARD.consumer.root },
            { name: "Explore" },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.consumer.register}
              startIcon={<Icon icon={plusFill} />}
            >
              Register Consumer
            </Button>
          }
        />
        <SearchConsumer />
        <ConsumerList />
      </Container>
    </Page>
  );
}
