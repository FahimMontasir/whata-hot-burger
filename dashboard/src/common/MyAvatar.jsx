import MAvatar from "./@mui-extend/MAvatar";
import createAvatar from "../utils/createAvatar";
import { USER } from "../layouts/dashboard/AccountPopover";

export default function MyAvatar({ ...other }) {
  return (
    <MAvatar
      src={USER.photoURL}
      alt={USER.displayName}
      color={USER.photoURL ? "default" : createAvatar(USER.displayName).color}
      {...other}
    >
      {createAvatar(USER.displayName).name}
    </MAvatar>
  );
}
