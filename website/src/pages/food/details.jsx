import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import Page from "../../common/Page";

export default function ComboDetails() {
  const { id } = useParams();
  console.log(id);

  return (
    <Page title="All foods">
      <Container maxWidth="lg">
        <Typography variant="h4" my={5}>
          Special Combos details
        </Typography>
      </Container>
    </Page>
  );
}
