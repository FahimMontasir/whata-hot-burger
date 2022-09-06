// material
import { styled } from "@mui/material";
// components
import Page from "../../common/Page";
import ComboPack from "./components/ComboPack";
import Hero from "./components/Hero";

const RootStyle = styled(Page)({
  height: "100%",
  padding: "0px",
});

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

export default function LandingPage() {
  return (
    <RootStyle title="Welcome to Whata Hot Burger" id="move_top">
      <Hero />
      <ContentStyle>
        <ComboPack />
      </ContentStyle>
    </RootStyle>
  );
}
