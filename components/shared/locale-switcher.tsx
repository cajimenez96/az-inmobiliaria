"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { Check, Languages } from "lucide-react";
import { useParams } from "next/navigation";

const locales = [
  { value: "en" as const, label: "English" },
  { value: "es" as const, label: "Español" },
] as const;

export function LocaleSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as string) || "en";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
          aria-label="Change language"
        >
          <Languages className="h-4 w-4" />
          <span className="hidden font-medium uppercase sm:inline">
            {currentLocale}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale.value} asChild>
            <Link
              href={pathname}
              locale={locale.value}
              className="flex cursor-pointer items-center justify-between gap-2"
            >
              {locale.label}
              {currentLocale === locale.value && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
