import { Icon } from "@iconify/react";
import bellFill from "@iconify/icons-eva/bell-fill";
import roundVpnKey from "@iconify/icons-ic/round-vpn-key";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
//components
import Profile from "../components/openAm/Profile";
import Notification from "../components/openAm/Notification";
import ChangePassword from "../components/openAm/ChangePassword";

//config
export const PROFILE_TABS = [
  {
    value: "general",
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <Profile />,
  },
  {
    value: "notifications",
    icon: <Icon icon={bellFill} width={20} height={20} />,
    component: <Notification />,
  },
  {
    value: "change_password",
    icon: <Icon icon={roundVpnKey} width={20} height={20} />,
    component: <ChangePassword />,
  },
];
