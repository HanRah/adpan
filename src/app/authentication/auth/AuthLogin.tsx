import React from "react";

import Typography from "@mui/material/Typography";

import { getCsrfToken } from "next-auth/react";

import AuthLoginForm from "./AuthLoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

async function getServerSideCsrfToken() {
  const csrfToken = await getCsrfToken();
  return csrfToken;
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  // const csrfToken = await getServerSideCsrfToken();
  // const session = await getServerSession(authOptions);

  // if (session) {
  //   redirect("/");
  // }

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}
      <AuthLoginForm csrfToken={''} />

      {subtitle}
    </>
  );
};

export default AuthLogin;
