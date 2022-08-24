import PropTypes from "prop-types";
// material
import { Card, Stack, Typography, Divider } from "@mui/material";
//util
import { fNumber } from "../../../../../../utils/formatNumber";
import { useGetCartQuery } from "../../../../../../store/redux/api/cart";
import CartCard from "./CartCard";

Cart.propTypes = {
  id: PropTypes.string,
};

export default function Cart({ id }) {
  const { isSuccess, data } = useGetCartQuery(id);
  // console.log(data);
  return (
    <Card sx={{ py: 3 }}>
      {isSuccess && (
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack width={1} textAlign="center">
            <Typography variant="h4">{fNumber(data.subTotal)}$</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cart: Subtotal
            </Typography>
          </Stack>
          <Stack width={1} textAlign="center">
            <Typography variant="h4">{fNumber(data.discount)}$</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cart: Discount
            </Typography>
          </Stack>
          <Stack width={1} textAlign="center">
            <Typography variant="h4">{fNumber(data.total)}$</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cart: Total
            </Typography>
          </Stack>

          <Stack width={1} textAlign="center">
            <Typography variant="h4">{fNumber(data.totalQty)}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cart: Total Quantity
            </Typography>
          </Stack>
        </Stack>
      )}
      <Stack sx={{ mt: 5, p: 5 }}>
        {isSuccess && <CartCard data={data.food} />}
      </Stack>
    </Card>
  );
}
