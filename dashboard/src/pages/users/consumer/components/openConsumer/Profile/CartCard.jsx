import PropTypes from "prop-types";
import React from "react";
import { Icon } from "@iconify/react";
import appleFilled from "@iconify/icons-ant-design/apple-filled";
import percentage from "@iconify/icons-ant-design/percentage";
import qtyIcon from "@iconify/icons-ant-design/fire-fill";
import priceIcon from "@iconify/icons-ant-design/dollar";
// material
import { Box, Typography, Stack, styled } from "@mui/material";
// utils
import { fShortenNumber } from "../../../../../../utils/formatNumber";
import Label from "../../../../../../common/Label";
import ComboTitle from "./ComboTitle";

// ----------------------------------------------------------------------

const ItemBlockStyle = styled((props) => (
  <Stack direction="row" alignItems="center" {...props} />
))({
  minWidth: 72,
  flex: "1 1",
});

const ItemIconStyle = styled(Icon)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled,
}));

// ----------------------------------------------------------------------

CartCard.propTypes = {
  data: PropTypes.object,
};

function CardItem({ food }) {
  return (
    <Stack mb={2} direction="row" alignItems="center" spacing={2}>
      <ItemBlockStyle sx={{ minWidth: 120 }}>
        <Box
          component="img"
          alt={food.name}
          src={food.photoUrl}
          sx={{ height: 30, width: 30, mr: 2 }}
        />
        <Typography variant="subtitle2">{food.name}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={priceIcon} />
        <Typography variant="body2">{fShortenNumber(food.price)}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={qtyIcon} />
        <Typography variant="body2">{fShortenNumber(food.qty)}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle sx={{ minWidth: 88 }}>
        <ItemIconStyle icon={appleFilled} />
        <Typography variant="body2">{food.size}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle sx={{ minWidth: 88 }}>
        <ItemIconStyle icon={percentage} />
        <Typography variant="body2">
          {fShortenNumber(food.discountRate)}
        </Typography>
      </ItemBlockStyle>
    </Stack>
  );
}

export default function CartCard({ data }) {
  const dItems = Object.keys(data);
  return (
    <>
      {dItems.map((key) => (
        <React.Fragment key={key}>
          {key === "notACombo" ? (
            <Label>Other Product</Label>
          ) : (
            <ComboTitle id={key} />
          )}
          {data[key].map((v) => (
            <CardItem key={v._id} food={v} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
}
