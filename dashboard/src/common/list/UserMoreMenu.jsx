import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import openIcon from "@iconify/icons-eva/eye-outline";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

UserMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  navigateWithData: PropTypes.func,
  navigateOpen: PropTypes.func,
};

export default function UserMoreMenu({
  onDelete,
  navigateWithData,
  navigateOpen,
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {onDelete && (
          <MenuItem onClick={onDelete} sx={{ color: "error.light" }}>
            <ListItemIcon>
              <Icon icon={trash2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Delete"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}

        {navigateWithData && (
          <MenuItem onClick={navigateWithData} sx={{ color: "success.main" }}>
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Edit"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
        {navigateOpen && (
          <MenuItem onClick={navigateOpen} sx={{ color: "info.main" }}>
            <ListItemIcon>
              <Icon icon={openIcon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Open"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
