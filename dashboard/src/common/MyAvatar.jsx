import MAvatar from "./@mui-extend/MAvatar";
import createAvatar from "../utils/createAvatar";

export default function MyAvatar({ USER, ...other }) {
  return (
    <MAvatar
      src={USER?.photoUrl}
      alt={USER?.name}
      color={USER?.photoUrl ? "default" : createAvatar(USER?.name).color}
      {...other}
    >
      {createAvatar(USER?.name).name}
    </MAvatar>
  );
}
