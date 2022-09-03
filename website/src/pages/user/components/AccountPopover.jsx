import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
// material
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  alpha,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH_PAGE } from "../../../routes/paths";
import { logout } from "../../../store/redux/slices/localStorageAuth";
import { useGetConsumerQuery } from "../../../store/redux/api/consumer";
import MIconButton from "../../../common/@mui-extend/MIconButton";
import MyAvatar from "../../../common/MyAvatar";
import MenuPopover from "../../../common/MenuPopover";

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: PATH_PAGE.user,
  },
];

export default function AccountPopover({ _id }) {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetConsumerQuery(_id);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <>
      {isLoading ? (
        <CircularProgress size="30px" />
      ) : (
        <>
          <MIconButton
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
              padding: 0,
              width: 44,
              height: 44,
              boxShadow: "2px 2px 2px gray",
              ...(open && {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              }),
            }}
          >
            <MyAvatar USER={data?.object} />
          </MIconButton>

          <MenuPopover
            open={open}
            onClose={handleClose}
            anchorEl={anchorRef.current}
            sx={{ width: 220 }}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle1" noWrap>
                {data?.object.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {data?.object.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            {MENU_OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => {
                  navigate(option.linkTo, {
                    state: option.linkTo === PATH_PAGE.user && data.object,
                  });
                  handleClose();
                }}
                sx={{ typography: "body2", py: 1, px: 2.5 }}
              >
                <Box
                  component={Icon}
                  icon={option.icon}
                  sx={{
                    mr: 2,
                    width: 24,
                    height: 24,
                  }}
                />

                {option.label}
              </MenuItem>
            ))}

            <Box sx={{ p: 2, pt: 1.5 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </Box>
          </MenuPopover>
        </>
      )}
    </>
  );
}
