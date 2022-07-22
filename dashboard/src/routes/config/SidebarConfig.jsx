// routes
import { PATH_DASHBOARD } from "../paths";
// components
import SvgIconStyle from "../../common/SvgIconStyle";

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  user: getIcon("ic_user"),
  ecommerce: getIcon("ic_ecommerce"),
};

const sidebarConfig = [
  {
    subheader: "dashboard",
    items: [
      {
        title: "explore",
        path: PATH_DASHBOARD.root,
        icon: ICONS.ecommerce,
      },
    ],
  },

  {
    subheader: "user management",
    items: [
      {
        title: "Admin & Manager",
        path: PATH_DASHBOARD.am.root,
        icon: ICONS.user,
        children: [
          { title: "Explore", path: PATH_DASHBOARD.am.explore },
          { title: "Register", path: PATH_DASHBOARD.am.register },
        ],
      },
      {
        title: "Consumer",
        path: PATH_DASHBOARD.consumer.root,
        icon: ICONS.user,
        children: [
          { title: "Explore", path: PATH_DASHBOARD.consumer.explore },
          { title: "Register", path: PATH_DASHBOARD.consumer.register },
        ],
      },
    ],
  },
];

export default sidebarConfig;
