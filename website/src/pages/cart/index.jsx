import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
// material
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import Page from "../../common/Page";
// components
import CheckoutCart from "./components/checkoutCart";
import CheckoutBillingAddress from "./components/checkoutBillingAddress";
import CheckoutPayment from "./components/checkoutPayment";
import CheckoutOrderComplete from "./components/CheckoutOrderComplete";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../store/redux/slices/localStorageAuth";
import { useGetCartQuery } from "../../store/redux/api/cart";

// ----------------------------------------------------------------------

const STEPS = ["Cart", "Billing & address", "Payment"];

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 20px)",
    right: "calc(50% + 20px)",
  },
  active: {
    "& $line": { borderColor: theme.palette.primary.main },
  },
  completed: {
    "& $line": { borderColor: theme.palette.primary.main },
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
}))(StepConnector);

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: active ? "primary.main" : "divider",
        bgcolor: "background.default",
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: "primary.main" }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "currentColor",
          }}
        />
      )}
    </Box>
  );
}

export default function EcommerceCheckout() {
  const { _id } = useSelector(getUser);
  const { isSuccess, data, isLoading } = useGetCartQuery(_id);

  const [activeStep, setActiveStep] = useState(0);
  const [addr, setAddr] = useState({});

  const isComplete = activeStep === STEPS.length;

  return (
    <Page title="Cart: Checkout">
      <Container maxWidth="lg">
        <Grid container justifyContent={isComplete ? "center" : "flex-start"}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      "& .MuiStepLabel-label": {
                        typography: "subtitle2",
                        color: "text.disabled",
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {!isComplete ? (
          <>
            {activeStep === 0 && (
              <CheckoutCart
                onCheckout={() => setActiveStep(1)}
                isSuccess={isSuccess}
                data={data}
                isLoading={isLoading}
              />
            )}
            {activeStep === 1 && (
              <CheckoutBillingAddress
                handleBackStep={() => setActiveStep(0)}
                handleMoveNextStep={() => setActiveStep(2)}
                handleSetAddr={setAddr}
                address={addr}
              />
            )}
            {activeStep === 2 && (
              <CheckoutPayment
                handleBackStep={() => setActiveStep(1)}
                handleMoveNextStep={() => setActiveStep(3)}
                isSuccess={isSuccess}
                data={data}
                address={addr}
              />
            )}
          </>
        ) : (
          <CheckoutOrderComplete open={isComplete} />
        )}
      </Container>
    </Page>
  );
}
