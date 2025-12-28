import { BackgroundEffects } from "@/app/modules/dashboard/components/layout/BackgroundEffects";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white scrollbar-custom relative">
      <BackgroundEffects />
      {children}
    </div>
  );
}
