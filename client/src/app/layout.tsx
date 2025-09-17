import type { Metadata } from "next";

import { LayoutProvider } from "@/contexts/layout-context";

import Label from "@/components/label";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: 'National College "Ienăchiță Văcărescu"',
  description:
    'National College "Ienăchiță Văcărescu" represents the place where students will gain what was called at the beginning of the century "high education".',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutProvider>
          <Label />
          <Header />
          <Menu />

          <div className="wrapper">
            {children}
            <Footer />
          </div>
        </LayoutProvider>
      </body>
    </html>
  );
}
