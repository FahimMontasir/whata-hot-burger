import PropTypes from "prop-types";
// material
import { Box, Button, ButtonGroup, Card, Stack, styled } from "@mui/material";
// component
import Label from "../../../../../common/Label";
import DialogModal from "../../../../../common/DialogModal";
import AddFood from "../addCombo";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

ComboCard.propTypes = {
  combo: PropTypes.object,
  handleDeleteCombo: PropTypes.func,
};

export default function ComboCard({ combo, handleDeleteCombo }) {
  const { _id, photoUrls, category, uptoDiscountRate } = combo;

  return (
    <Card>
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
      <Stack alignItems="center" py="5px">
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={() => handleDeleteCombo(_id)}>Delete</Button>
          <DialogModal title="Update" update fullScreen>
            <AddFood isEdit currentProduct={combo} />
          </DialogModal>
        </ButtonGroup>
      </Stack>
    </Card>
  );
}
