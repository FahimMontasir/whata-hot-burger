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
    subheader: "management",
    items: [
      {
        title: "user",
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: "Admin & Manager", path: PATH_DASHBOARD.user.am },
          { title: "Consumer", path: PATH_DASHBOARD.user.consumer },
        ],
      },
    ],
  },
];

export default sidebarConfig;
