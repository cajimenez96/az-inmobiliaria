import { Link } from "@/i18n/navigation";
import { LayoutDashboard, PlusCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import AgentProfileCard from "@/components/shared/dashboard/agent-profile-card";
import { auth } from "@/lib/auth";
import { getCompanyConfig } from "@/lib/company";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const t = await getTranslations("dashboard");
  const company = await getCompanyConfig();

  if (!session) {
    redirect({ href: "/sign-in", locale: locale as "en" | "es" });
  }

  if (session.user.role !== "AGENT") {
    redirect({ href: "/", locale: locale as "en" | "es" });
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="hidden w-64 flex-col border-r bg-white dark:bg-slate-900 md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <span className="text-xl font-bold tracking-tight">{company.name}</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" /> {t("overview")}
            </Button>
          </Link>
          <Link href="/dashboard/add">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <PlusCircle className="h-4 w-4" /> {t("addProperty")}
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" /> {t("settings")}
            </Button>
          </Link>
        </nav>

        <AgentProfileCard />
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex h-16 items-center border-b bg-white px-6 md:hidden dark:bg-slate-900">
          <span className="font-bold">{t("agentBrand", { companyName: company.name })}</span>
        </header>
        <div className="flex-1 p-6 md:p-8 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
