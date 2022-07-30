// material
import { Container } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../common/Page";
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import DialogModal from "../../../common/DialogModal";
import AddFood from "./components/addFood";

export default function ExploreFood() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Explore Consumer">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Explore Food"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Food", href: PATH_DASHBOARD.food.root },
            { name: "Explore Food" },
          ]}
          action={
            <DialogModal title="Add Food" fullScreen>
              <AddFood />
            </DialogModal>
          }
        />
        <h1>hello</h1>
      </Container>
    </Page>
  );
}
