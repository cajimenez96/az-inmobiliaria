import companyJson from "@/config/company.json";
import prisma from "@/lib/prisma";

export interface CompanyConfig {
  name: string;
  tagline: string;
  since: string;
  legalName: string;
  meta: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
  };
  contact: {
    address: string;
    phone: string;
    phoneSchedule: string;
    email: string;
    emailSupport: string;
  };
  social: {
    twitterUrl: string;
    instagramUrl: string;
    facebookUrl: string;
  };
  stats: {
    listingsCount: string;
    soldCount: string;
    satisfactionPercent: string;
  };
}

const defaultConfig = companyJson as CompanyConfig;

/**
 * Returns the company configuration. Reads from the database first (edits from
 * dashboard); if no row exists, falls back to config/company.json.
 */
export async function getCompanyConfig(): Promise<CompanyConfig> {
  const row = await prisma.companyConfig.findFirst({
    orderBy: { updatedAt: "desc" },
  });
  if (row && row.data && typeof row.data === "object") {
    return row.data as unknown as CompanyConfig;
  }
  return defaultConfig;
}

/**
 * Saves the company configuration to the database. Used by the dashboard
 * settings page; changes are reflected on the next request.
 */
export async function saveCompanyConfig(data: CompanyConfig): Promise<void> {
  const existing = await prisma.companyConfig.findFirst();
  const payload = data as unknown as Record<string, unknown>;
  if (existing) {
    await prisma.companyConfig.update({
      where: { id: existing.id },
      data: { data: payload, updatedAt: new Date() },
    });
  } else {
    await prisma.companyConfig.create({
      data: { data: payload },
    });
  }
}

export { defaultConfig };
