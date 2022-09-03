import { alpha, Card, styled, Typography, useTheme } from "@mui/material";

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    minHeight: 440,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(10, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up("md")]: {
      boxShadow: "none",
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    "&.cardLeft": {
      [theme.breakpoints.up("md")]: { marginTop: -40 },
    },
    "&.cardCenter": {
      [theme.breakpoints.up("md")]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        "&:before": {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: "auto",
          position: "absolute",
          width: "calc(100% - 40px)",
          height: "calc(100% - 40px)",
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

const CardImageStyle = styled("img")(({ theme }) => ({
  width: 40,
  height: 40,
  margin: "auto",
  marginBottom: theme.spacing(10),
  filter: shadowIcon(theme.palette.primary.main),
}));

export default function ComboCard({ index, card }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <CardStyle
      className={(index === 0 && "cardLeft") || (index === 1 && "cardCenter")}
    >
      <CardImageStyle src={card.icon} alt={card.title} />
      <Typography variant="h5" paragraph>
        {card.title}
      </Typography>
      <Typography sx={{ color: isLight ? "text.secondary" : "common.white" }}>
        {card.description}
      </Typography>
    </CardStyle>
  );
}
