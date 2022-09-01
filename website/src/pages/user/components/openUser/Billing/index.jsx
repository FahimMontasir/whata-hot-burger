import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
// material
import { Box, Grid, Card, Button, Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import BillingAddressBook from "./BillingAddressBook";
import PaymentMethod from "./PaymentMethod";
import InvoiceHistory from "./InvoiceHistory";
import { useGetConsumerInvoicesQuery } from "../../../../../store/redux/api/invoice";
//components

export default function Billing() {
  const { cards, addressBook } = {
    cards: [],
    invoices: [],
    addressBook: [],
  };
  const { state } = useLocation();

  const { isSuccess, data } = useGetConsumerInvoicesQuery(state._id);
  console.log(data);
  const [open, setOpen] = useState(false);

  const NewCardSchema = Yup.object().shape({
    cardName: Yup.string().required("Name is required"),
    cardNumber: Yup.string().required("Card number is required"),
    cardExpired: Yup.string().required("Card expired is required"),
    cardCvv: Yup.string().required("Cvv is required"),
  });

  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      cardExpired: "",
      cardCvv: "",
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      handleCancel();
      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography
              variant="overline"
              sx={{ mb: 3, display: "block", color: "text.secondary" }}
            >
              Your Plan
            </Typography>
            <Typography variant="h4">Premium</Typography>
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: "absolute" },
                top: { sm: 24 },
                right: { sm: 24 },
              }}
            >
              <Button
                size="small"
                color="inherit"
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Cancel plan
              </Button>
              <Button size="small" variant="outlined">
                Upgrade plan
              </Button>
            </Box>
          </Card>

          <PaymentMethod
            cards={cards}
            formik={formik}
            isOpen={open}
            onOpen={handleOpenAddCard}
            onCancel={handleCancel}
          />

          <BillingAddressBook addressBook={addressBook} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        {isSuccess && <InvoiceHistory invoices={data.array} />}
      </Grid>
    </Grid>
  );
}
