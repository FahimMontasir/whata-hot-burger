import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-eva/home-fill";
import roundGrain from "@iconify/icons-ic/round-grain";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";
// routes
import { PATH_PAGE } from "../routes/paths";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Explore",
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: "/",
  },
  {
    title: "Combo",
    icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    path: PATH_PAGE.combo,
  },
  {
    title: "Dine",
    icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    path: PATH_PAGE.dine,
  },
  {
    title: "Nutrition Tips",
    icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
    path: PATH_PAGE.blog,
  },
  {
    title: "FAQs",
    icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
    path: PATH_PAGE.faq,
  },
  {
    title: "About Us",
    icon: <Icon icon={bookOpenFill} {...ICON_SIZE} />,
    path: PATH_PAGE.aboutUs,
  },
];

export default menuConfig;
