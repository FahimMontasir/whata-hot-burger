import { Icon } from "@iconify/react";
import { Box, CircularProgress, Typography } from "@mui/material";
import plusFill from "@iconify/icons-eva/plus-fill";
import minusFill from "@iconify/icons-eva/minus-fill";
import MIconButton from "./@mui-extend/MIconButton";

export const Incrementor = ({
  q,
  incrementQuantity,
  decrementQuantity,
  isLoading = false,
  available,
}) => {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        borderColor: "grey.50032",
      }}
    >
      {isLoading ? (
        <CircularProgress size="20px" />
      ) : (
        <MIconButton
          size="small"
          color="inherit"
          disabled={q <= 1}
          onClick={decrementQuantity}
        >
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
      )}
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: "center",
          display: "inline-block",
        }}
      >
        {q}
      </Typography>
      {isLoading ? (
        <CircularProgress size="20px" />
      ) : (
        <MIconButton
          size="small"
          color="inherit"
          disabled={available === q}
          onClick={incrementQuantity}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      )}
    </Box>
  );
};
