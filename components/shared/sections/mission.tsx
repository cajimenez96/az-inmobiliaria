import { getTranslations } from "next-intl/server";
import { CheckCircle2, Globe, Trophy, Users } from "lucide-react";
import Image from "next/image";

const Mission = async () => {
  const t = await getTranslations("about");
  const items = [
    { icon: Trophy, titleKey: "missionAward", descKey: "missionAwardDesc" },
    { icon: Users, titleKey: "missionClient", descKey: "missionClientDesc" },
    { icon: Globe, titleKey: "missionNetwork", descKey: "missionNetworkDesc" },
    { icon: CheckCircle2, titleKey: "missionTransparency", descKey: "missionTransparencyDesc" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              {t("missionTitle")}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {t("missionDescription")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {items.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t(item.titleKey)}</h4>
                    <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/team-meeting.avif"
              alt="Team Meeting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
