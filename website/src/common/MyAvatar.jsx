import createAvatar from "../utils/createAvatar";
import MAvatar from "./@mui-extend/MAvatar";

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
