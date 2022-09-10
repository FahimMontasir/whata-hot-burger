import { Button, CircularProgress } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import cart from "@iconify/icons-ic/shopping-cart";
import AccountPopover from "./AccountPopover";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/redux/slices/localStorageAuth";
import { useGetCartQuery } from "../../../store/redux/api/cart";
import { PATH_PAGE } from "../../../routes/paths";

export default function ShowCartCover() {
  const { _id } = useSelector(getUser);
  const { isLoading, isSuccess, data } = useGetCartQuery(_id);
  // console.log(data);
  return (
    <>
      <AccountPopover _id={_id} />
      <Button
        disabled={!isSuccess}
        sx={{ ml: 2 }}
        startIcon={<Icon icon={cart} />}
        variant="contained"
        component={RouterLink}
        to={PATH_PAGE.cart}
      >
        {isLoading ? (
          <CircularProgress color="warning" size="10px" />
        ) : (
          <>${isSuccess ? data.total : "000"}</>
        )}
      </Button>
    </>
  );
}
