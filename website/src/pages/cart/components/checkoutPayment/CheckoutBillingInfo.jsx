import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import editFill from "@iconify/icons-eva/edit-fill";
// material
import {
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent,
} from "@mui//material";

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {
  onBackStep: PropTypes.func,
};

export default function CheckoutBillingInfo({ onBackStep, address }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button
            size="small"
            type="button"
            startIcon={<Icon icon={editFill} />}
            onClick={onBackStep}
          >
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {address.state}&nbsp;
          <Typography
            component="span"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            ({address.state})
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {address.fullAddress}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {address.phone}
        </Typography>
      </CardContent>
    </Card>
  );
}
