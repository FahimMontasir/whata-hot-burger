import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";
// material
import { styled, Box, Button, Divider, Typography, Stack } from "@mui/material";

import { DialogAnimate } from "../../../common/animate";
import { PATH_PAGE } from "../../../routes/paths";
import { OrderCompleteIllustration } from "../../../assets/image";
import InvoiceToolbar from "../../../common/pdf/InvoiceToolbar";

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: 0,
    [theme.breakpoints.up("md")]: {
      maxWidth: "calc(100% - 48px)",
      maxHeight: "calc(100% - 48px)",
    },
  },
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ open, invoiceData }) {
  const navigate = useNavigate();

  const handleResetStep = () => {
    navigate(PATH_PAGE.food);
  };

  return (
    <DialogStyle fullScreen open={open}>
      <Box sx={{ p: 4, maxWidth: 480, margin: "auto" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" paragraph>
            Thank you for your purchase!
          </Typography>

          <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

          <Typography align="left" paragraph>
            Thanks for placing order &nbsp;
            {invoiceData._id}
          </Typography>

          <Typography align="left">
            We will send you a email within 5 days when it ships.
            <br /> <br /> If you have any question or queries then feel free to
            contact us or mail at moontasir001@gmail.com. <br /> <br /> All the
            best,
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            color="inherit"
            onClick={handleResetStep}
            startIcon={<Icon icon={arrowIosBackFill} />}
          >
            Continue Browsing
          </Button>
          <InvoiceToolbar invoice={invoiceData} />
        </Stack>
      </Box>
    </DialogStyle>
  );
}
