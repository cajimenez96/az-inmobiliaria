import { Button } from "@/components/ui/button";
import { getCompanyConfig } from "@/lib/company";
import { getTranslations } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const Values = async () => {
  const t = await getTranslations("values");
  const company = await getCompanyConfig();
  const items = [t("item1"), t("item2"), t("item3"), t("item4")];

  return (
    <section className="py-20">
      <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-auto lg:h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop"
            alt={t("imageAlt")}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title", { companyName: company.name })}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("description")}</p>
          <ul className="space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button size="lg">{t("cta")}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
