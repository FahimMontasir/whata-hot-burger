import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  Alert,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// routes
import { PATH_AUTH } from "../../../routes/paths";
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { useLoginMutation } from "../../../store/redux/api/am";
import { useDispatch } from "react-redux";
import { login } from "../../../store/redux/slices/localStorageAuth";

//main component
export default function LoginForm() {
  const [validateLogin, { isError, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await validateLogin(values).unwrap();
        dispatch(login({ token: result.text }));
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {isError && <Alert severity="error">{error.data.message}</Alert>}

          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack sx={{ my: 2 }}>
          <Link
            component={RouterLink}
            variant="subtitle2"
            to={PATH_AUTH.resetPassword}
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
