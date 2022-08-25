// material
import { Container } from "@mui/material";
import DialogModal from "../../common/DialogModal";
import HeaderBreadcrumbs from "../../common/HeaderBreadcrumbs";
import useSettings from "../../hooks/useSettings";
import DineList from "./dineList";
import Page from "../../common/Page";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
import AddDine from "./addDine";

export default function ComboPage() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Dine">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Book a Dine"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Food", href: PATH_DASHBOARD.food.root },
            { name: "Dine" },
          ]}
          action={
            <DialogModal title="Add Dine" fullScreen>
              <AddDine />
            </DialogModal>
          }
        />
        <DineList />
      </Container>
    </Page>
  );
}
