import { getCompanyConfig } from "@/lib/company";
import { getTranslations } from "next-intl/server";

const Stats = async () => {
  const t = await getTranslations("stats");
  const company = getCompanyConfig();
  const statItems = [
    { label: t("activeListings"), value: company.stats.listingsCount },
    { label: t("soldProperties"), value: company.stats.soldCount },
    { label: t("satisfiedClients"), value: company.stats.satisfactionPercent },
  ];

  return (
    <section className="border-b bg-background py-10">
      <div className="container mx-auto flex flex-col items-center justify-around gap-8 px-4 sm:flex-row md:gap-16 sm:px-6 lg:px-8">
        {statItems.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-primary md:text-4xl">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
