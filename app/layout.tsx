import "@/app/styles/globals.css";
import "@/app/styles/animations.css";
import "@/app/styles/scrollbar.css";

import { Providers } from "@/app/providers/Providers";

export const metadata = {
  title: "My Application",
  description: "Shared layout for public + protected routes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
