import { Link } from "@/i18n/navigation";
import Image from "next/image";
import SignUpForm from "@/components/shared/forms/sign-up-form";
import { auth } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect({ href: "/", locale: locale as "en" | "es" });

  const t = await getTranslations("auth");

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("signUp.title")}</h1>
            <p className="text-balance text-muted-foreground">{t("signUp.subtitle")}</p>
          </div>

          <SignUpForm />

          <div className="mt-4 text-center text-sm">
            {t("signUp.hasAccount")}{" "}
            <Link
              href="/sign-in"
              className="underline font-medium text-primary hover:text-primary/80"
            >
              {t("signUp.signInLink")}
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block relative h-full max-h-screen overflow-hidden">
        <Image
          src="/signup-image.avif"
          alt={t("signUp.imageAlt")}
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
      </div>
    </div>
  );
}
