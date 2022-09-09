import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";
// material
import {
  Grid,
  Card,
  Button,
  CardHeader,
  Typography,
  Skeleton,
} from "@mui/material";
import Scrollbar from "../../../../common/Scrollbar";
// routes
import { PATH_PAGE } from "../../../../routes/paths";
// components
import EmptyContent from "./EmptyContent";
import CheckoutSummary from "./CheckoutSummary";
import CartCard from "../../../user/components/openUser/Profile/CartCard";

// ----------------------------------------------------------------------

export default function CheckoutCart({
  onCheckout,
  isSuccess,
  data,
  isLoading,
}) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        {isLoading && <Skeleton variant="rounded" height={500} />}
        {isSuccess && (
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title={
                <Typography variant="h6">
                  Total
                  <Typography component="span" sx={{ color: "text.secondary" }}>
                    &nbsp;({data.totalQty} item)
                  </Typography>
                </Typography>
              }
              sx={{ mb: 2 }}
            />

            {data.food ? (
              <Scrollbar sx={{ p: 3 }}>
                <CartCard data={data.food} />
              </Scrollbar>
            ) : (
              <EmptyContent
                title="Cart is empty"
                description="Look like you have no items in your shopping cart."
                img="/static/illustrations/illustration_empty_cart.svg"
              />
            )}
          </Card>
        )}

        <Button
          color="inherit"
          component={RouterLink}
          to={PATH_PAGE.food}
          startIcon={<Icon icon={arrowIosBackFill} />}
        >
          Continue Browsing
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        {isLoading && <Skeleton variant="rounded" height={300} />}
        {isSuccess && (
          <>
            <CheckoutSummary data={data} />
            <Button
              fullWidth
              size="large"
              onClick={onCheckout}
              variant="contained"
              disabled={data.subTotal < 1}
            >
              Check Out
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}
