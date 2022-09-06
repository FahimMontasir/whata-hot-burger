// material
import { Box, Stack, Typography, styled } from "@mui/material";
// components
import Page from "../../common/Page";
import ConsumerForm from "./components/form/ConsumerForm";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 980,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

//main component
export default function Register() {
  return (
    <Page title="Register To WhataHotBurger">
      <ContentStyle>
        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Register to Whata Hot Burger
            </Typography>
          </Box>
        </Stack>
        <ConsumerForm />
      </ContentStyle>
    </Page>
  );
}
