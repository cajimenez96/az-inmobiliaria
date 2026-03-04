import companyJson from "@/config/company.json";

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

let cached: CompanyConfig | null = null;

/**
 * Returns the company configuration from config/company.json.
 * Cached for the process lifetime.
 */
export function getCompanyConfig(): CompanyConfig {
  if (cached) return cached;
  cached = companyJson as CompanyConfig;
  return cached;
}
