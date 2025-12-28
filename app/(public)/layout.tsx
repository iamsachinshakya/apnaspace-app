import Header from "@/app/shared/components/layout/Header";
import Footer from "@/app/shared/components/layout/Footer";

export const metadata = {
  title: "Public Pages",
  description: "Public section of the website",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
