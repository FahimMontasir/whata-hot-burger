import { Icon } from "@iconify/react";
import bellFill from "@iconify/icons-eva/bell-fill";
import roundVpnKey from "@iconify/icons-ic/round-vpn-key";
import roundAccountBox from "@iconify/icons-ic/round-account-box";
import roundReceipt from "@iconify/icons-ic/round-receipt";
//components
import Profile from "../components/openConsumer/Profile";
import Notification from "../components/openConsumer/Notification";
import ChangePassword from "../components/openConsumer/ChangePassword";
import Billing from "../components/openConsumer/Billing";

//config
export const PROFILE_TABS = [
  {
    value: "general",
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <Profile />,
  },
  {
    value: "billing",
    icon: <Icon icon={roundReceipt} width={20} height={20} />,
    component: <Billing />,
  },
  {
    value: "notifications",
    icon: <Icon icon={bellFill} width={20} height={20} />,
    component: <Notification />,
  },
  {
    value: "change password",
    icon: <Icon icon={roundVpnKey} width={20} height={20} />,
    component: <ChangePassword />,
  },
];
