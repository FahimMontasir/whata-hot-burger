import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-ic/round-grain";
import combo from "@iconify/icons-ic/restaurant-menu";
import dine from "@iconify/icons-ic/restaurant";
import blog from "@iconify/icons-ic/book";
import faq from "@iconify/icons-ic/question-answer";
import aboutUs from "@iconify/icons-ic/info";
// routes
import { PATH_PAGE } from "../routes/paths";

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
    title: "Food",
    icon: <Icon icon={combo} {...ICON_SIZE} />,
    path: PATH_PAGE.food,
  },
  {
    title: "Dine",
    icon: <Icon icon={dine} {...ICON_SIZE} />,
    path: PATH_PAGE.dine,
  },
  {
    title: "Nutrition Tips",
    icon: <Icon icon={blog} {...ICON_SIZE} />,
    path: PATH_PAGE.blog,
  },
  {
    title: "FAQs",
    icon: <Icon icon={faq} {...ICON_SIZE} />,
    path: PATH_PAGE.faq,
  },
  {
    title: "About Us",
    icon: <Icon icon={aboutUs} {...ICON_SIZE} />,
    path: PATH_PAGE.aboutUs,
  },
];

export default menuConfig;
