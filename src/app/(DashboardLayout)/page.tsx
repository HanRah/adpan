import DashboardContent from "@/app/(DashboardLayout)/components/dashboard/DashboardContent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect("/authentication/login");
  }
  return <DashboardContent />;
};
