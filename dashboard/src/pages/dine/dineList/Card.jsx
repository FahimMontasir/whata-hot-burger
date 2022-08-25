import PropTypes from "prop-types";
// material
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Stack,
  styled,
  Typography,
} from "@mui/material";
// component
import Label from "../../../common/Label";
import DialogModal from "../../../common/DialogModal";
import AddDine from "../addDine";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

DineCard.propTypes = {
  dine: PropTypes.object,
  handleDeleteDine: PropTypes.func,
};

export default function DineCard({ dine, handleDeleteDine }) {
  const { _id, name, description, photoUrl, isAvailable } = dine;

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <Label
          variant="filled"
          color={isAvailable ? "success" : "error"}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: "absolute",
            textTransform: "uppercase",
          }}
        >
          {isAvailable ? "Open" : "Booked"}
        </Label>

        <ProductImgStyle alt="dine cover photo" src={photoUrl} />
      </Box>
      <Stack alignItems="center" py="5px">
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={() => handleDeleteDine(_id)}>Delete</Button>
          <DialogModal title="Update" update>
            <AddDine isEdit currentProduct={dine} />
          </DialogModal>
        </ButtonGroup>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="caption">{description}</Typography>
      </Stack>
    </Card>
  );
}
