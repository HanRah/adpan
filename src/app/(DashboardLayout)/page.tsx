import DashboardContent from "@/app/(DashboardLayout)/components/dashboard/DashboardContent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session) {
    return (<DashboardContent />);
  } else {
    redirect("/authentication/login");
  }
};

export default Dashboard;
