import PropTypes from "prop-types";
// material
import { Box, Card, styled } from "@mui/material";
// component
import Label from "../../../common/Label";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

ComboCard.propTypes = {
  combo: PropTypes.object,
  onClick: PropTypes.func,
};

export default function ComboCard({ combo, onClick }) {
  const { photoUrls, category, uptoDiscountRate } = combo;

  return (
    <Card onClick={onClick}>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <Label
          variant="filled"
          color="error"
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: "absolute",
            textTransform: "uppercase",
          }}
        >
          {category}
        </Label>

        <Label
          variant="filled"
          color="info"
          sx={{
            top: 16,
            left: 16,
            zIndex: 9,
            position: "absolute",
            textTransform: "uppercase",
          }}
        >
          Upto: {uptoDiscountRate}%
        </Label>

        <ProductImgStyle alt="combo cover photo" src={photoUrls[0]} />
      </Box>
    </Card>
  );
}
