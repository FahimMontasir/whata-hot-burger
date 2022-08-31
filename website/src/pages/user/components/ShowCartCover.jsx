import { Button, CircularProgress } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import cart from "@iconify/icons-ic/shopping-cart";
import AccountPopover from "./AccountPopover";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/redux/slices/localStorageAuth";
import { useGetCartQuery } from "../../../store/redux/api/cart";

export default function ShowCartCover() {
  const { _id } = useSelector(getUser);
  const { isLoading, isSuccess } = useGetCartQuery(_id);

  return (
    <>
      <AccountPopover _id={_id} />
      <Button
        disabled={!isSuccess}
        sx={{ ml: 2 }}
        startIcon={<Icon icon={cart} />}
        variant="contained"
        component={RouterLink}
        to="/combo"
      >
        {isLoading ? (
          <CircularProgress color="warning" size="10px" />
        ) : (
          "$00.00"
        )}
      </Button>
    </>
  );
}
