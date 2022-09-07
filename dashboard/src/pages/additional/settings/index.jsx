// material
import { Container } from "@mui/material";
// component
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import Page from "../../../common/Page";
import useSettings from "../../../hooks/useSettings";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
import DialogModal from "../../../common/DialogModal";
import { useGetTermsConditionQuery } from "../../../store/redux/api/termsAndCondition";
import AddTerms from "./components/AddTerms";
import Settings from "../../../common/settings";

export default function SettingsPage() {
  const { themeStretch } = useSettings();
  const { isSuccess, data } = useGetTermsConditionQuery();

  return (
    <Page title="Dashboard Settings">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="All Settings"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Settings" },
          ]}
          action={
            isSuccess && (
              <DialogModal
                title={data.object ? "Update Terms" : "Add Terms"}
                fullScreen
              >
                <AddTerms
                  currentValue={data.object}
                  isEdit={Boolean(data.object)}
                />
              </DialogModal>
            )
          }
        />
        <Settings />
      </Container>
    </Page>
  );
}
