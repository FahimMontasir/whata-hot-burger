import { Icon } from "@iconify/react";
import { Link as RouterLink } from "react-router-dom";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import facebookFill from "@iconify/icons-eva/facebook-fill";
import instagramFilled from "@iconify/icons-ant-design/instagram-filled";
// material
import {
  Box,
  Tooltip,
  styled,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  Button,
} from "@mui/material";
import MIconButton from "../../../common/@mui-extend/MIconButton";
import Label from "../../../common/Label";
import Scrollbar from "../../../common/Scrollbar";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/redux/slices/localStorageAuth";
import { PATH_PAGE } from "../../../routes/paths";
import { toast } from "react-toastify";
import { useAddComboCartMutation } from "../../../store/redux/api/cart";

const SOCIALS = [
  {
    name: "Facebook",
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />,
  },
  {
    name: "Instagram",
    icon: (
      <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
    ),
  },
  {
    name: "Linkedin",
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />,
  },
  {
    name: "Twitter",
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />,
  },
];

const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: "cover",
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm,
}));

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(6, 3, 0, 0),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

export default function ComboDetailsSummary({ combo, comboId }) {
  const { _id: userId } = useSelector(getUser);
  const foods = combo.food.map((f) => {
    return {
      userId: userId,
      foodId: f._id,
      qty: 1,
      size: "standard:0",
      comboId: comboId,
    };
  });

  const [addCart] = useAddComboCartMutation();

  const handleAddToCart = () => {
    addCart(foods)
      .unwrap()
      .then((data) => toast.success(data.text))
      .catch(() => toast.error("Add to cart failed"));
  };

  return (
    <RootStyle>
      <Scrollbar>
        <TableContainer sx={{ p: 1 }}>
          <Table>
            <TableBody>
              {combo.food.map((row) => {
                const { _id, name, photoUrl, category, price, discountRate } =
                  row;

                return (
                  <TableRow
                    key={_id}
                    sx={{ boxShadow: "-1px 1px 4px gainsboro" }}
                  >
                    <TableCell
                      style={{ minWidth: 150 }}
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      <ThumbImgStyle alt={name} src={photoUrl} />
                    </TableCell>
                    <TableCell align="left">{name}</TableCell>
                    <TableCell align="left">
                      {category.map((v, i) => (
                        <Label key={i}>{v}</Label>
                      ))}
                    </TableCell>
                    <TableCell align="right">${price}</TableCell>
                    <TableCell align="right">{discountRate}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        {userId ? (
          <Button
            variant="contained"
            sx={{ minWidth: 150 }}
            onClick={handleAddToCart}
          >
            add to cart
          </Button>
        ) : (
          <Button
            component={RouterLink}
            to={PATH_PAGE.login}
            variant="contained"
            sx={{ minWidth: 220 }}
          >
            Login for adding to cart
          </Button>
        )}
      </Box>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <MIconButton>{social.icon}</MIconButton>
          </Tooltip>
        ))}
      </Box>
    </RootStyle>
  );
}
