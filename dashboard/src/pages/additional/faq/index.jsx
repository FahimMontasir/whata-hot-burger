// material
import { Container } from "@mui/material";
// component
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import Page from "../../../common/Page";
import useSettings from "../../../hooks/useSettings";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
import DialogModal from "../../../common/DialogModal";
import AddFAQ from "./components/add";
import FAQList from "./components/list";

export default function FAQPage() {
  const { themeStretch } = useSettings();

  return (
    <Page title="FAQ">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Frequently Asked Question"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "FAQ" },
          ]}
          action={
            <DialogModal title="Add Question">
              <AddFAQ />
            </DialogModal>
          }
        />
        <FAQList />
      </Container>
    </Page>
  );
}
