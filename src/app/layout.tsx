import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Providers } from "./providers";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Leonardo AI Challenge"
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <main style={{ minHeight: "calc(100vh - 60px)" }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
