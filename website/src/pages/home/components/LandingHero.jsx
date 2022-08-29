import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import flashFill from "@iconify/icons-eva/flash-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Button,
  Box,
  Container,
  Typography,
  Stack,
  styled,
} from "@mui/material";
//
import {
  varFadeInUp,
  varWrapEnter,
  varFadeInRight,
} from "../../../common/animate";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[300],
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    margin: "auto",
    textAlign: "center",
    position: "relative",
    paddingTop: theme.spacing(30),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(15),
      margin: "unset",
      textAlign: "right",
    },
  })
);

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: "100%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("lg")]: {
    right: "55%",
    width: "auto",
    height: "80vh",
  },
}));

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroImgStyle
          alt="hero"
          src="/static/illustrations/hero.png"
          variants={varFadeInUp}
        />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h1" sx={{ color: "common.black" }}>
                Welcome to <br />
                <Typography
                  component="span"
                  variant="h1"
                  sx={{ color: "primary.main" }}
                >
                  Whata Hot Burger
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography
                variant="h5"
                sx={{
                  color: "common.black",
                  bgcolor: { xs: "rgba(228, 233, 237,0.8)", md: "transparent" },
                  borderRadius: { xs: 1, md: 0 },
                }}
              >
                To get full experience and <br /> lots of eye catchy features
                with ease.
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                to="/"
                variant="contained"
                component={RouterLink}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                Download the mobile app
              </Button>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: "100vh" } }} />
    </>
  );
}
