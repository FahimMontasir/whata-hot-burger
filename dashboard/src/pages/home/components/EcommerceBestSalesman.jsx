// material
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
  useTheme,
} from "@mui/material";
// utils
import { fCurrency } from "../../../utils/formatNumber";
//
import Label from "../../../common/Label";
import Scrollbar from "../../../common/Scrollbar";

// ----------------------------------------------------------------------

const COUNTRY = ["de", "en", "fr", "kr", "us"];
const CATEGORY = ["CAP", "Branded Shoes", "Headphone", "Cell Phone", "Earings"];

const MOCK_SALES = [...Array(5)].map((_, index) => ({
  id: index,
  name: "fahim",
  email: "fahim@e.com",
  avatar: "https//:avatar.jpg",
  category: CATEGORY[index],
  flag: `/static/icons/ic_flag_${COUNTRY[index]}.svg`,
  total: 1000,
  rank: `Top ${index + 1}`,
}));

// ----------------------------------------------------------------------

export default function EcommerceBestSalesman() {
  const theme = useTheme();

  return (
    <Card sx={{ pb: 3 }}>
      <CardHeader title="Best Salesman" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seller</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="right">Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_SALES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar alt={row.name} src={row.avatar} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2"> {row.name}</Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {row.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <img src={row.flag} alt="country flag" />
                  </TableCell>
                  <TableCell>{fCurrency(row.total)}</TableCell>
                  <TableCell align="right">
                    <Label
                      variant={
                        theme.palette.mode === "light" ? "ghost" : "filled"
                      }
                      color={
                        (row.rank === "Top 1" && "primary") ||
                        (row.rank === "Top 2" && "info") ||
                        (row.rank === "Top 3" && "success") ||
                        (row.rank === "Top 4" && "warning") ||
                        "error"
                      }
                    >
                      {row.rank}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
