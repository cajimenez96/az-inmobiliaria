import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { getCompanyConfig } from "@/lib/company";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const company = getCompanyConfig();
  const template = company.meta.titleTemplate.replace(
    "{companyName}",
    company.name,
  );
  return {
    title: { template, default: company.meta.defaultTitle },
    description: company.meta.defaultDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
