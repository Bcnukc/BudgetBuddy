import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return <>Hi {user.name}</>;
};

export default DashboardPage;
