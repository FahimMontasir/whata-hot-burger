import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, Card, Container, styled, Tab, Tabs } from "@mui/material";
//hooks
import useSettings from "../../../../hooks/useSettings";
//config
import { PROFILE_TABS } from "./tabs.config";
//components
import Page from "../../../../common/Page";
import HeaderBreadcrumbs from "../../../../common/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import ProfileCover from "../../../../common/profile/Cover";

//styled component
const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

export default function OpenConsumer() {
  const { themeStretch } = useSettings();
  const { state } = useLocation();
  const [currentTab, setCurrentTab] = useState("general");

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page
      title={
        state ? `${state.type.toUpperCase()}: ${state.name}` : "Manager Account"
      }
    >
      {state ? (
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "Consumer", href: PATH_DASHBOARD.consumer.root },
              { name: state ? state.name : "Consumer Account" },
            ]}
          />
          <Card
            sx={{
              mb: 3,
              height: 280,
              position: "relative",
            }}
          >
            <ProfileCover myProfile={state} />

            <TabsWrapperStyle>
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={handleChangeTab}
              >
                {PROFILE_TABS.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    value={tab.value}
                    icon={tab.icon}
                    label={tab.value}
                  />
                ))}
              </Tabs>
            </TabsWrapperStyle>
          </Card>
          {PROFILE_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Container>
      ) : (
        <Navigate to="404" />
      )}
    </Page>
  );
}
