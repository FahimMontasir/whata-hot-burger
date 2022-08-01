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
import AddCombo from "./components/addCombo";
import ComboList from "./components/ComboList/ComboLIst";

export default function ComboPage() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Combo">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Combo"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Food", href: PATH_DASHBOARD.food.root },
            { name: "Combo" },
          ]}
          action={
            <DialogModal title="Add Combo" fullScreen>
              <AddCombo />
            </DialogModal>
          }
        />
        <ComboList />
      </Container>
    </Page>
  );
}
