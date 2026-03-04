import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getCompanyConfig } from "@/lib/company";

export async function generateMetadata(): Promise<Metadata> {
  const company = await getCompanyConfig();
  return {
    title: company.meta.defaultTitle,
    description: company.meta.defaultDescription,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages ?? undefined}>
      {children}
    </NextIntlClientProvider>
  );
}
