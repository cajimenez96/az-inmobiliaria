import CompanySettingsForm from "@/components/shared/forms/company-settings-form";
import { getCompanyConfig } from "@/lib/company";
import { getTranslations } from "next-intl/server";

export default async function DashboardSettingsPage() {
  const company = await getCompanyConfig();
  const t = await getTranslations("dashboard");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{t("settingsTitle")}</h2>
        <p className="text-muted-foreground mt-1">{t("settingsDescription")}</p>
      </div>
      <CompanySettingsForm initial={company} />
    </div>
  );
}
