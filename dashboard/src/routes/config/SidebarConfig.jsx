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
  food: getIcon("ic_food"),
  dine: getIcon("ic_dine"),
  blog: getIcon("ic_blog"),
  faq: getIcon("ic_faq"),
  terms: getIcon("ic_terms"),
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

  {
    subheader: "food & dine management",
    items: [
      {
        title: "Food",
        path: PATH_DASHBOARD.food.root,
        icon: ICONS.food,
        children: [
          { title: "Explore", path: PATH_DASHBOARD.food.explore },
          { title: "Combo", path: PATH_DASHBOARD.food.combo },
          { title: "Cart", path: PATH_DASHBOARD.food.cart },
          { title: "Invoice", path: PATH_DASHBOARD.food.invoice },
        ],
      },
      {
        title: "Dine",
        path: PATH_DASHBOARD.dine.root,
        icon: ICONS.dine,
      },
    ],
  },

  {
    subheader: "Additional",
    items: [
      {
        title: "Blog",
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: "Posts", path: PATH_DASHBOARD.blog.posts },
          { title: "Create", path: PATH_DASHBOARD.blog.createPost },
        ],
      },
      {
        title: "FAQ",
        path: PATH_DASHBOARD.faq.root,
        icon: ICONS.faq,
      },
      {
        title: "Settings",
        path: PATH_DASHBOARD.settings.root,
        icon: ICONS.terms,
      },
    ],
  },
];

export default sidebarConfig;
