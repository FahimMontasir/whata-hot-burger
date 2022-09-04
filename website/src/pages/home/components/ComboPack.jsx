// material
import {
  Box,
  Grid,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
//
import {
  varFadeInUp,
  MotionInView,
  varFadeInDown,
} from "../../../common/animate";
import { useGetComboByCategoryQuery } from "../../../store/redux/api/combo";

import ComboCard from "../../food/components/ComboCard";

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

export default function ComboPack() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const { isSuccess, data } = useGetComboByCategoryQuery("Special deals");

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 5, md: 10 } }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Special combo pack for you!!!
            </Typography>
          </MotionInView>
        </Box>

        {isSuccess && (
          <Grid container spacing={isDesktop ? 10 : 5}>
            {data.array.map((combo) => (
              <Grid key={combo._id} item xs={12} md={4}>
                <MotionInView variants={varFadeInUp}>
                  <ComboCard
                    combo={combo}
                    onClick={() => navigate(`/food/${combo._id}`)}
                  />
                </MotionInView>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </RootStyle>
  );
}
