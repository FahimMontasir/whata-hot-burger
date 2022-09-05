// material
import { Card, Grid, Skeleton, Container, Typography } from "@mui/material";
// hooks
import { useParams } from "react-router-dom";
import { useGetComboQuery } from "../../store/redux/api/combo";
// components
import Page from "../../common/Page";
import ComboDetailsCarousel from "./components/ComboDetailsCarousel";
import ComboDetailsSummary from "./components/ComboDetailsSummary";

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ paddingTop: "100%", borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function ComboDetails() {
  const { id } = useParams();
  const { data, isSuccess, isError, isLoading } = useGetComboQuery(id);

  console.log(data);
  return (
    <Page title="product details">
      <Container maxWidth="lg">
        {isSuccess && (
          <Card>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Card sx={{ m: 5, p: 5 }}>
                  <ComboDetailsCarousel combo={data.object} />
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <ComboDetailsSummary combo={data.object} />
              </Grid>
            </Grid>
          </Card>
        )}

        {isLoading && SkeletonLoad}

        {isError && <Typography variant="h6">404 Combo not found</Typography>}
      </Container>
    </Page>
  );
}
