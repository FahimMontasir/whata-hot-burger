// material
import { Button, Container } from "@mui/material";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
// component
import HeaderBreadcrumbs from "../../../common/HeaderBreadcrumbs";
import Page from "../../../common/Page";
import useSettings from "../../../hooks/useSettings";
import BlogList from "./components/list";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";

export default function ExploreBlog() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Explore Blogs">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Explore All Blogs"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Blog", href: PATH_DASHBOARD.blog.root },
            { name: "Explore Blogs" },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.blog.createPost}
              startIcon={<Icon icon={plusFill} />}
            >
              Add Blog
            </Button>
          }
        />
        <BlogList />
      </Container>
    </Page>
  );
}
