import Hero from "@/components/shared/sections/hero";
import Stats from "@/components/shared/sections/stats";
import Featured from "@/components/shared/sections/featured";
import Values from "@/components/shared/sections/values";
import { getCompanyConfig } from "@/lib/company";

export default function HomePage() {
  const company = getCompanyConfig();
  return (
    <>
      <Hero companyName={company.name} />
      <Stats />
      <Featured />
      <Values />
    </>
  );
}
