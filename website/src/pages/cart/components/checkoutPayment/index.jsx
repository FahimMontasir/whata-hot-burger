import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import arrowIosBackFill from "@iconify/icons-eva/arrow-ios-back-fill";
// material
import { Grid, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
//
import CheckoutSummary from "../checkoutCart/CheckoutSummary";
import CheckoutBillingInfo from "./CheckoutBillingInfo";
import CheckoutPaymentMethods from "./CheckoutPaymentMethods";
import { useAddInvoiceMutation } from "../../../../store/redux/api/invoice";
import { toast } from "react-toastify";
import { useDeleteAllCartMutation } from "../../../../store/redux/api/cart";

const PAYMENT_OPTIONS = [
  {
    value: "paypal",
    title: "Pay with Paypal",
    description:
      "You will be redirected to /Pay*Pal website to complete your purchase securely.",
    icons: ["/static/icons/ic_paypal.svg"],
  },
  {
    value: "credit_card",
    title: "Credit / Debit Card",
    description: "We support Master*card, Vi*sa, Discover and Stripe.",
    icons: ["/static/icons/ic_mastercard.svg", "/static/icons/ic_visa.svg"],
  },
  {
    value: "cash",
    title: "Cash on CheckoutDelivery",
    description: "Pay with cash when your order is delivered.",
    icons: [],
  },
];

const CARDS_OPTIONS = [
  { value: "ViSa*1", label: "**** **** **** 1212 - Jimmy Holland" },
  { value: "Vi*Sa2", label: "**** **** **** 2424 - Shawn Stokes" },
  { value: "Master*Ca*rd", label: "**** **** **** 4545 - Cole Armstrong" },
];

export default function CheckoutPayment({
  data,
  isSuccess,
  address,
  handleBackStep,
  handleMoveNextStep,
  userId,
  setInvoiceData,
}) {
  const [addInvoice, { isLoading }] = useAddInvoiceMutation();

  const [clearCart] = useDeleteAllCartMutation();

  const PaymentSchema = Yup.object().shape({
    Method: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      Method: "cash",
      isSuccess: true,
      details: "not available",
    },
    validationSchema: PaymentSchema,
    onSubmit: (values) => {
      const allVal = {
        userId: userId,
        name: address.name,
        email: address.email,
        address: address.address,
        items: data.food,
        paidAmount: data.total,
        paymentStatus: values,
      };

      addInvoice(allVal)
        .unwrap()
        .then(async (data) => {
          toast.success("Purchased Successful!!!");
          await clearCart();
          setInvoiceData(data.object);
          handleMoveNextStep();
        })
        .catch(() => {
          toast.error("Purchase failed :( Please try again!");
        });
    },
  });

  const { handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CheckoutPaymentMethods
              formik={formik}
              cardOptions={CARDS_OPTIONS}
              paymentOptions={PAYMENT_OPTIONS}
            />
            <Button
              type="button"
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutBillingInfo
              address={address}
              onBackStep={handleBackStep}
            />
            {isSuccess && <CheckoutSummary data={data} />}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Complete Order
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
