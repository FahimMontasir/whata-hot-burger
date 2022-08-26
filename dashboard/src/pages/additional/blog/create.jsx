// material
import { Container } from "@mui/material";
// component
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import Page from "../../../common/Page";
import useSettings from "../../../hooks/useSettings";
import BlogNewPostForm from "./components/form";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";

export default function CreateBlog() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Create Blog">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Create Blog"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Blog", href: PATH_DASHBOARD.blog.posts },
            { name: "Create Blog" },
          ]}
        />
        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
