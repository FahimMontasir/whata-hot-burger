import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MotionInView, varFadeInUp } from "../../common/animate";
import Page from "../../common/Page";
import { useGetComboByCategoryQuery } from "../../store/redux/api/combo";
import ComboCard from "./components/ComboCard";

export default function Combo() {
  const { isSuccess, data } = useGetComboByCategoryQuery("Special deals");
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Page title="All foods">
      <Container maxWidth="lg">
        <Typography variant="h4" my={5}>
          Special Combos
        </Typography>
        {isSuccess && (
          <Grid container spacing={isDesktop ? 10 : 5}>
            {data.array.map((combo) => (
              <Grid key={combo._id} item xs={12} md={4}>
                <MotionInView variants={varFadeInUp}>
                  <ComboCard combo={combo} />
                </MotionInView>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Page>
  );
}
