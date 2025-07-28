import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Providers } from "./providers";
import { ReactNode } from "react";
import { Header } from "@/components/header";

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
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
