import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MotionInView, varFadeInUp } from "../../common/animate";
import Page from "../../common/Page";
import { useGetComboByCategoryQuery } from "../../store/redux/api/combo";
import ComboCard from "./components/ComboCard";
import FoodList from "./components/FoodList";
import ComboList, { SkeletonLoad } from "./components/List";

export default function Combo() {
  const { isSuccess, data, isLoading } =
    useGetComboByCategoryQuery("Special deals");
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  return (
    <Page title="All foods">
      <Container maxWidth="lg">
        <Typography variant="h4" my={5}>
          Special Combos
        </Typography>
        {isLoading && SkeletonLoad}
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
        <ComboList />

        <FoodList />
      </Container>
    </Page>
  );
}
