import { merge } from "lodash";
import Card from "./Card";
import Chip from "./Chip";
import Tabs from "./Tabs";
import Menu from "./Menu";
import Grid from "./Grid";
import Link from "./Link";
import Lists from "./Lists";
import Table from "./Table";
import Alert from "./Alert";
import Badge from "./Badge";
import Paper from "./Paper";
import Input from "./Input";
import Radio from "./Radio";
import Drawer from "./Drawer";
import Dialog from "./Dialog";
import Avatar from "./Avatar";
import Slider from "./Slider";
import Button from "./Button";
import Switch from "./Switch";
import Select from "./Select";
import SvgIcon from "./SvgIcon";
import Tooltip from "./Tooltip";
import Popover from "./Popover";
import Stepper from "./Stepper";
import Skeleton from "./Skeleton";
import Backdrop from "./Backdrop";
import Progress from "./Progress";
import Checkbox from "./Checkbox";
import Container from "./Container";
import Accordion from "./Accordion";
import Typography from "./Typography";
import Pagination from "./Pagination";
import IconButton from "./IconButton";
import Breadcrumbs from "./Breadcrumbs";
import ButtonGroup from "./ButtonGroup";
import Autocomplete from "./Autocomplete";
import ControlLabel from "./ControlLabel";
import LoadingButton from "./LoadingButton";

export default function ComponentsOverrides(theme) {
  return merge(
    Tabs(theme),
    Chip(theme),
    Card(theme),
    Menu(theme),
    Grid(theme),
    Link(theme),
    Input(theme),
    Radio(theme),
    Badge(theme),
    Lists(theme),
    Table(theme),
    Paper(theme),
    Alert(theme),
    Switch(theme),
    Select(theme),
    Button(theme),
    Dialog(theme),
    Avatar(theme),
    Slider(theme),
    Drawer(theme),
    Stepper(theme),
    Tooltip(theme),
    Popover(theme),
    SvgIcon(theme),
    Checkbox(theme),
    Skeleton(theme),
    Backdrop(theme),
    Progress(theme),
    Container(theme),
    Accordion(theme),
    IconButton(theme),
    Typography(theme),
    Pagination(theme),
    ButtonGroup(theme),
    Breadcrumbs(theme),
    Autocomplete(theme),
    ControlLabel(theme),
    LoadingButton(theme)
  );
}
