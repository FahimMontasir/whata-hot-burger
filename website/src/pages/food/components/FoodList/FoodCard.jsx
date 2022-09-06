import { Button, styled, TableCell, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Incrementor } from "../../../../common/Incrementor";
import Label from "../../../../common/Label";
import useIncDec from "../../../../hooks/useIncDec";
import { PATH_PAGE } from "../../../../routes/paths";
import { useAddFoodCartMutation } from "../../../../store/redux/api/cart";

//styled component
const ThumbImgStyle = styled("img")(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: "cover",
  margin: theme.spacing(0, 4),
  borderRadius: theme.shape.borderRadiusSm,
}));

export default function FoodCard({ food, userId }) {
  const { _id, name, photoUrl, category, price, discountRate, numberInStock } =
    food;

  const { q, decrementQuantity, incrementQuantity } = useIncDec(1);
  const [addCart] = useAddFoodCartMutation();

  const handleAddToCart = () => {
    addCart({
      userId: userId,
      foodId: _id,
      qty: q,
      size: "standard:0",
    })
      .unwrap()
      .then((data) => toast.success(data.text))
      .catch(() => toast.error("Add to cart failed"));
  };

  return (
    <TableRow hover>
      <TableCell
        style={{ maxWidth: 100 }}
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
      <TableCell align="right">Price: ${price}</TableCell>
      <TableCell align="right">Discount Rate: {discountRate}%</TableCell>
      <TableCell align="right">Stock: {numberInStock}</TableCell>
      <TableCell align="center" sx={{ maxWidth: 110 }}>
        <Incrementor
          q={q}
          decrementQuantity={decrementQuantity}
          incrementQuantity={incrementQuantity}
          available={numberInStock}
        />
      </TableCell>
      <TableCell align="right">
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
      </TableCell>
    </TableRow>
  );
}
