import React from "react";

import Typography from "@mui/material/Typography";

import { getCsrfToken } from "next-auth/react";

import AuthLoginForm from "./AuthLoginForm";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

async function getServerSideCsrfToken() {
  const csrfToken: string | undefined = await getCsrfToken();
  return csrfToken;
}

const AuthLogin = async ({ title, subtitle, subtext }: loginType) => {
  const csrfToken = await getServerSideCsrfToken();

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}
      <AuthLoginForm csrfToken={csrfToken} />

      {subtitle}
    </>
  );
};

export default AuthLogin;
