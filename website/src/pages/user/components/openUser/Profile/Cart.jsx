import PropTypes from "prop-types";
// material
import { Card, Stack, Typography, Divider, Button } from "@mui/material";
import CartCard from "./CartCard";
//api
import { useGetCartQuery } from "../../../../../store/redux/api/cart";
//util
import { fNumber } from "../../../../../utils/formatNumber";
import NotFound from "../../../../../common/NotFound";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "../../../../../routes/paths";
import Scrollbar from "../../../../../common/Scrollbar";

Cart.propTypes = {
  id: PropTypes.string,
};

export default function Cart({ id }) {
  const { isSuccess, data, error } = useGetCartQuery(id);
  // console.log(data);
  return (
    <Card sx={{ py: 3 }}>
      {isSuccess && (
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack width={1} textAlign="center">
            <Typography variant="h4">{fNumber(data?.subTotal)}$</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cart: Subtotal
            </Typography>
          </Stack>
          <Stack width={1} textAlign="center">
            <Typography variant="h4">{fNumber(data?.discount)}$</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cart: Discount
            </Typography>
          </Stack>
          <Stack width={1} textAlign="center">
            <Typography variant="h4">{fNumber(data?.total)}$</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cart: Total
            </Typography>
          </Stack>

          <Stack width={1} textAlign="center">
            <Typography variant="h4">{fNumber(data?.totalQty)}</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Cart: Total Quantity
            </Typography>
          </Stack>
        </Stack>
      )}
      <Stack sx={{ mt: 5, p: 5 }}>
        {isSuccess ? (
          <>
            <Scrollbar>
              <CartCard data={data?.food} />
            </Scrollbar>
            <Button component={Link} to={PATH_PAGE.cart}>
              Go to Cart
            </Button>
          </>
        ) : (
          <NotFound
            message={
              error ? error.data.message : "Check your network connection"
            }
          />
        )}
      </Stack>
    </Card>
  );
}
