import AuthGuard from "@/app/modules/auth/components/AuthGuard";
import DashboardPage from "@/app/modules/dashboard/DashboardPage";

function page() {
  return (
    <div>
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    </div>
  );
}

export default page;
