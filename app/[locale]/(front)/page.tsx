import Hero from "@/components/shared/sections/hero";
import Stats from "@/components/shared/sections/stats";
import Featured from "@/components/shared/sections/featured";
import Values from "@/components/shared/sections/values";
import { getCompanyConfig } from "@/lib/company";

export default async function HomePage() {
  const company = await getCompanyConfig();
  return (
    <>
      <Hero companyName={company.name} />
      <Stats />
      <Featured />
      <Values />
    </>
  );
}
