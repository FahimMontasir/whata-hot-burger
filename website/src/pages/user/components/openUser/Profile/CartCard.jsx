import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import percentage from "@iconify/icons-ant-design/percentage";
import trash2Fill from "@iconify/icons-eva/trash-2-fill";
import qtyIcon from "@iconify/icons-ant-design/fire-fill";
import priceIcon from "@iconify/icons-ant-design/dollar";
// material
import {
  Box,
  Typography,
  Stack,
  styled,
  CircularProgress,
} from "@mui/material";
// utils
import { fShortenNumber } from "../../../../../utils/formatNumber";
import React from "react";
import ComboTitle from "./ComboTitle";
import Label from "../../../../../common/Label";
import { Incrementor } from "../../../../../common/Incrementor";
import useIncDec from "../../../../../hooks/useIncDec";
import MIconButton from "../../../../../common/@mui-extend/MIconButton";
import {
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "../../../../../store/redux/api/cart";
import { toast } from "react-toastify";

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

CartCard.propTypes = {
  data: PropTypes.object,
};

function CardItem({ food }) {
  const { q, decrementQuantity, incrementQuantity } = useIncDec(food.qty);

  const [updateItem, { isLoading }] = useUpdateCartMutation();

  const [deleteCartItem, { isLoading: isLoadingD }] = useDeleteCartMutation();

  const onDelete = () => {
    deleteCartItem({ _id: food.cartId })
      .unwrap()
      .then((data) => toast.success(data.text))
      .catch(() => toast.error("Delete failed"));
  };

  const incrementQuantityAsync = () => {
    updateItem({ _id: food.cartId, qty: q + 1, size: food.size })
      .unwrap()
      .then(() => {
        incrementQuantity();
        toast.success("Item incremented successfully");
      })
      .catch(() => {
        toast.error("Item increment failed");
      });
  };

  const decrementQuantityAsync = () => {
    updateItem({ _id: food.cartId, qty: q - 1, size: food.size })
      .unwrap()
      .then(() => {
        decrementQuantity();
        toast.success("Item decremented successfully");
      })
      .catch(() => {
        toast.error("Item decrement failed");
      });
  };

  return (
    <Stack mb={2} direction="row" alignItems="center" spacing={2}>
      <ItemBlockStyle sx={{ minWidth: 120 }}>
        <Box
          component="img"
          alt={food.name}
          src={food.photoUrl}
          sx={{ height: 30, width: 30, mr: 2, borderRadius: 0.5 }}
        />
        <Typography variant="subtitle2">{food.name}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={priceIcon} />
        <Typography variant="body2">{food.price}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={qtyIcon} />
        <Typography variant="body2">{fShortenNumber(food.qty)}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle sx={{ minWidth: 88 }}>
        <Incrementor
          q={q}
          decrementQuantity={decrementQuantityAsync}
          incrementQuantity={incrementQuantityAsync}
          available={food.numberInStock}
          isLoading={isLoading}
        />
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={percentage} />
        <Typography variant="body2">
          {fShortenNumber(food.discountRate)}
        </Typography>
      </ItemBlockStyle>

      {isLoadingD ? (
        <CircularProgress size="20px" />
      ) : (
        <MIconButton onClick={onDelete}>
          <Icon icon={trash2Fill} width={20} height={20} />
        </MIconButton>
      )}
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
