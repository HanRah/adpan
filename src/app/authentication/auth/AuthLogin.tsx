import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

import Link from "next/link";
import { getCsrfToken } from "next-auth/react";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";


interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

async function GetServerSideCsrfToken() {
  const csrfToken: string | undefined = await getCsrfToken()
  return csrfToken
}


const AuthLogin = async ({ title, subtitle, subtext }: loginType) => {
  const csrfToken = await GetServerSideCsrfToken()
  const router = useRouter();
  const [error, setError] = React.useState<string | null>();
  const formik = useFormik({
    initialValues: { username: "", password: "", tenantKey: "" },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl: `${window.location.origin}`,
      });
      if (res?.error) {
        setError(res?.error);
      } else {
        setError(null);
      }
      if (res?.url) {
        router.push(res?.url);
        router.refresh();
      }
    },
  });
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <form onSubmit={formik.handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField
              fullWidth
              variant="outlined"
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              fullWidth
              type="password"
              variant="outlined"
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            component={Link}
            href="/"
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  )
};

export default AuthLogin;
