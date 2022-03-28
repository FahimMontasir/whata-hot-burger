import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
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
// hooks
import useIsMountedRef from "../../hooks/useIsMountedRef";
// components
import MIconButton from "../../common/@mui-extend/MIconButton";
import MyAvatar from "../../common/MyAvatar";
import MenuPopover from "../../common/MenuPopover";

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: PATH_DASHBOARD.user.profile,
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: PATH_DASHBOARD.user.account,
  },
];

export const USER = {
  displayName: "fahim",
  email: "@g.com",
  photoURL: "http:random.com",
};

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => "logout";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <MyAvatar />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {USER.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {USER.email}
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
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}