// material
import { Card, Container, styled } from "@mui/material";
// components
import Page from "../../common/Page";
import MHidden from "../../common/@mui-extend/MHidden";
import RegisterFormAM from "./components/RegisterFormAM";

//styled components
const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  margin: theme.spacing(2, 0, 2, 2),
  backgroundImage: `url(/static/illustrations/registeram.jpg)`,
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
export default function RegisterAM() {
  return (
    <RootStyle title="Register Admin or Manager">
      <MHidden width="mdDown">
        <SectionStyle />
      </MHidden>

      <Container>
        <ContentStyle>
          <RegisterFormAM />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
