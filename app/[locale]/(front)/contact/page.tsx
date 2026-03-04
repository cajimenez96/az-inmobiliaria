import { getCompanyConfig } from "@/lib/company";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/shared/forms/contact-form";

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const company = await getCompanyConfig();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t("headquarters")}</h3>
                  <p className="text-muted-foreground mt-1">{company.contact.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t("phoneLabel")}</h3>
                  <p className="text-muted-foreground mt-1">{company.contact.phone}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {company.contact.phoneSchedule}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t("emailLabel")}</h3>
                  <p className="text-muted-foreground mt-1">{company.contact.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {company.contact.emailSupport}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
