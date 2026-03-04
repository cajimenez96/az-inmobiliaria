import { getTranslations } from "next-intl/server";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = async () => {
  const tCompany = await getTranslations("company");
  const tFooter = await getTranslations("footer");

  return (
    <footer className="border-t bg-background py-6 md:py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">{tCompany("name")}</span>.{" "}
          {tFooter("rights")}
        </p>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="#" aria-label={tFooter("ariaTwitter")}>
            <Twitter className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <Link href="#" aria-label={tFooter("ariaInstagram")}>
            <Instagram className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
          <Link href="#" aria-label={tFooter("ariaFacebook")}>
            <Facebook className="h-5 w-5 hover:text-foreground transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
