// material
import { Box, Card, Stack, Container, Typography, styled } from "@mui/material";
// components
import Page from "../../common/Page";
import MHidden from "../../common/@mui-extend/MHidden";
import RegisterForm from "./components/RegisterForm";

//styled components
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(10, 0, 0, 10),
  backgroundImage: `url(/static/illustrations/login.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
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
    <RootStyle title="Login To WhataHotBurger Dashboard">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography
            variant="h3"
            sx={{ px: 5, mt: 10, mb: 5, color: "primary.light" }}
          >
            Hi, Welcome to WhataHotBurger
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Register to Whata HotBurger Dashboard
              </Typography>
            </Box>
          </Stack>

          <RegisterForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
