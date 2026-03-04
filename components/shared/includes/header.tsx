import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Link } from "@/i18n/navigation";
import { getCompanyConfig } from "@/lib/company";
import { getTranslations } from "next-intl/server";
import { Menu } from "lucide-react";
import { headers } from "next/headers";
import { LocaleSwitcher } from "../locale-switcher";
import UserDropdown from "../user/user-dropdown";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const t = await getTranslations("nav");
  const company = getCompanyConfig();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">{company.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            {t("home")}
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            {t("about")}
          </Link>
          <Link
            href="/properties"
            className="hover:text-primary transition-colors"
          >
            {t("properties")}
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <UserDropdown />
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:flex" asChild>
                <Link href="/sign-in">{t("signIn")}</Link>
              </Button>
              <Button className="hidden sm:flex" asChild>
                <Link href="/sign-up">{t("getStarted")}</Link>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t("toggleMenu")}</span>
              </Button>
            </>
          )}
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
