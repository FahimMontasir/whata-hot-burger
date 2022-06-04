import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  alpha,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import MIconButton from "../../common/@mui-extend/MIconButton";
import MyAvatar from "../../common/MyAvatar";
import MenuPopover from "../../common/MenuPopover";
//api
import { getUser, logout } from "../../store/redux/slices/localStorageAuth";
import { useGetAMQuery } from "../../store/redux/api/auth";

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: PATH_DASHBOARD.root,
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: PATH_DASHBOARD.root,
  },
];

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { _id } = useSelector(getUser);
  const { data } = useGetAMQuery(_id);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
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
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {data?.object.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
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
  );
}
