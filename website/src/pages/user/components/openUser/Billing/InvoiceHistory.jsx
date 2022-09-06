import PropTypes from "prop-types";
// material
import { Stack, Typography } from "@mui/material";
// utils
import { fDate } from "../../../../../utils/formatTime";
import { fCurrency } from "../../../../../utils/formatNumber";
//
import InvoiceToolbar from "../../../../../common/pdf/InvoiceToolbar";

InvoiceHistory.propTypes = {
  invoices: PropTypes.array,
};

export default function InvoiceHistory({ invoices }) {
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="subtitle1" sx={{ width: 1 }}>
        Invoice History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {invoices.map((invoice) => (
          <Stack
            key={invoice._id}
            direction="row"
            justifyContent="space-between"
            sx={{ width: 1 }}
          >
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              {fDate(invoice.createdAt)}
            </Typography>
            <Typography variant="body2">
              {fCurrency(invoice.paidAmount)}
            </Typography>
            <InvoiceToolbar noPrint invoice={invoice} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
