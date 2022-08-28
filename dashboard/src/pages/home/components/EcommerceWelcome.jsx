// material
import { Typography, Button, Card, CardContent, styled } from "@mui/material";
//
import { MotivationIllustration } from "../../../assets/image";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function EcommerceWelcome() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          color: "grey.800",
          p: { md: 0 },
          pl: { md: 5 },
        }}
      >
        <Typography gutterBottom variant="h4">
          Congratulations,
          <br /> Whata Hot Burger Company!
        </Typography>

        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: "auto" }}
        >
          Contact with the owner of this company.
        </Typography>

        <Button
          variant="contained"
          href="https://moontasir.web.app/"
          target="_blank"
        >
          Details
        </Button>
      </CardContent>

      <MotivationIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: "auto", md: "inherit" },
        }}
      />
    </RootStyle>
  );
}
