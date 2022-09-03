// material
import {
  Box,
  Grid,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
//
import {
  varFadeInUp,
  MotionInView,
  varFadeInDown,
} from "../../../common/animate";

import ComboCard from "../../food/components/ComboCard";

const CARDS = [
  {
    icon: "/static/icons/ic_design.svg",
    title: "UI & UX Design",
    description:
      "The set is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.",
  },
  {
    icon: "/static/icons/ic_code.svg",
    title: "Development",
    description:
      "Easy to customize and extend each component, saving you time and money.",
  },
  {
    icon: "/static/brand/logo_single.svg",
    title: "Branding",
    description:
      "Consistent design in colors, fonts ... makes brand recognition easy.",
  },
  {
    icon: "/static/brand/logo_single.svg",
    title: "Branding",
    description:
      "Consistent design in colors, fonts ... makes brand recognition easy.",
  },
  {
    icon: "/static/brand/logo_single.svg",
    title: "Branding",
    description:
      "Consistent design in colors, fonts ... makes brand recognition easy.",
  },
];

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

export default function ComboPack() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Special combo pack for you!!!
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={index} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <ComboCard index={index} card={card} />
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
