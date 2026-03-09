import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const t = useTranslations("contact.form");
  return (
    <Card className="lg:col-span-2">
      <CardContent className="p-6 sm:p-8">
        <form className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="first-name">{t("firstName")}</Label>
              <Input id="first-name" placeholder={t("firstNamePlaceholder")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">{t("lastName")}</Label>
              <Input id="last-name" placeholder={t("lastNamePlaceholder")} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("phonePlaceholder")}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="inquiry-type">{t("interestedIn")}</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("selectTopic")} />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="buy">{t("topics.buy")}</SelectItem>
                <SelectItem value="rent">{t("topics.rent")}</SelectItem>
                <SelectItem value="sell">{t("topics.sell")}</SelectItem>
                <SelectItem value="agent">{t("topics.agent")}</SelectItem>
                <SelectItem value="other">{t("topics.other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              placeholder={t("messagePlaceholder")}
              className="min-h-[150px]"
            />
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            {t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
