import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LayoutContent from "./LayoutContent";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session) {
    return (<LayoutContent>{children}</LayoutContent>);
  } else {
    redirect("/authentication/login");
  }
};

export default RootLayout;