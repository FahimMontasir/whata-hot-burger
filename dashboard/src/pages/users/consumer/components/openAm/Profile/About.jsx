import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import emailFill from "@iconify/icons-eva/email-fill";
import roundBusinessCenter from "@iconify/icons-ic/round-business-center";
// material
import { Card, Typography, CardHeader, Stack, styled } from "@mui/material";
//utils
import { fDate, fDateTimeSuffix } from "../../../../../../utils/formatTime";

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

About.propTypes = {
  profile: PropTypes.object,
};

export default function About({ profile }) {
  const { email, type, contactNo, dateOfBirth, managerialPosition, updatedAt } =
    profile;

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{type}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            {managerialPosition} at WhataHotBurger
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{email}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{contactNo}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">
            Date of Birth: {fDate(dateOfBirth)}
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">
            Last update: {fDateTimeSuffix(updatedAt)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
