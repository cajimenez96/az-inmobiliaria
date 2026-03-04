"use client";

import type { CompanyConfig } from "@/lib/company";
import { updateCompanyConfig } from "@/lib/actions/company.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useTransition, useState } from "react";
import { toast } from "sonner";

interface CompanySettingsFormProps {
  initial: CompanyConfig;
}

export default function CompanySettingsForm({ initial }: CompanySettingsFormProps) {
  const t = useTranslations("dashboard");
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(initial);

  const update = (patch: Partial<CompanyConfig>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };
  const updateMeta = (patch: Partial<CompanyConfig["meta"]>) => {
    setForm((prev) => ({ ...prev, meta: { ...prev.meta, ...patch } }));
  };
  const updateContact = (patch: Partial<CompanyConfig["contact"]>) => {
    setForm((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));
  };
  const updateSocial = (patch: Partial<CompanyConfig["social"]>) => {
    setForm((prev) => ({ ...prev, social: { ...prev.social, ...patch } }));
  };
  const updateStats = (patch: Partial<CompanyConfig["stats"]>) => {
    setForm((prev) => ({ ...prev, stats: { ...prev.stats, ...patch } }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateCompanyConfig(form);
      if (result.ok) {
        toast.success(t("saved"));
      } else {
        toast.error(result.error ?? "Error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("identity")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={form.tagline}
              onChange={(e) => update({ tagline: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="since">Since</Label>
            <Input
              id="since"
              value={form.since}
              onChange={(e) => update({ since: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="legalName">Legal name</Label>
            <Input
              id="legalName"
              value={form.legalName}
              onChange={(e) => update({ legalName: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("meta")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="defaultTitle">Default title</Label>
            <Input
              id="defaultTitle"
              value={form.meta.defaultTitle}
              onChange={(e) => updateMeta({ defaultTitle: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="titleTemplate">Title template (use {"{companyName}"})</Label>
            <Input
              id="titleTemplate"
              value={form.meta.titleTemplate}
              onChange={(e) => updateMeta({ titleTemplate: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="defaultDescription">Default description</Label>
            <Input
              id="defaultDescription"
              value={form.meta.defaultDescription}
              onChange={(e) => updateMeta({ defaultDescription: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("contact")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={form.contact.address}
              onChange={(e) => updateContact({ address: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={form.contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneSchedule">Phone schedule</Label>
            <Input
              id="phoneSchedule"
              value={form.contact.phoneSchedule}
              onChange={(e) => updateContact({ phoneSchedule: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="emailSupport">Support email</Label>
            <Input
              id="emailSupport"
              type="email"
              value={form.contact.emailSupport}
              onChange={(e) => updateContact({ emailSupport: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("social")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="twitterUrl">Twitter URL</Label>
            <Input
              id="twitterUrl"
              value={form.social.twitterUrl}
              onChange={(e) => updateSocial({ twitterUrl: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instagramUrl">Instagram URL</Label>
            <Input
              id="instagramUrl"
              value={form.social.instagramUrl}
              onChange={(e) => updateSocial({ instagramUrl: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="facebookUrl">Facebook URL</Label>
            <Input
              id="facebookUrl"
              value={form.social.facebookUrl}
              onChange={(e) => updateSocial({ facebookUrl: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("stats")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="listingsCount">Listings count (e.g. 2,500+)</Label>
            <Input
              id="listingsCount"
              value={form.stats.listingsCount}
              onChange={(e) => updateStats({ listingsCount: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="soldCount">Sold count</Label>
            <Input
              id="soldCount"
              value={form.stats.soldCount}
              onChange={(e) => updateStats({ soldCount: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="satisfactionPercent">Satisfaction %</Label>
            <Input
              id="satisfactionPercent"
              value={form.stats.satisfactionPercent}
              onChange={(e) => updateStats({ satisfactionPercent: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isPending}>
        {isPending ? "..." : t("save")}
      </Button>
    </form>
  );
}
