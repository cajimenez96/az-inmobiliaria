"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PropertyType, Status } from "@/lib/generated/prisma/enums";
import { formatType } from "@/lib/utils";
import { deleteProperty } from "@/lib/actions/property.actions";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
interface AgentProperty {
  id: string;
  title: string;
  slug: string;
  location: string;
  price: string;
  status: Status;
  type: PropertyType;
  image: string;
  createdAt: Date;
}

export function AgentPropertiesTable({ data }: { data: AgentProperty[] }) {
  const { data: session } = authClient.useSession();
  const t = useTranslations("dashboard.table");
  // Status map
  const statusMap: Record<Status, string> = {
    ACTIVE: t("statusActive"),
    INACTIVE: t("statusInactive"),
    SOLD: t("statusSold"),
    RENTED: t("statusRented"),
  };

  // Type map
  const typeMap: Record<PropertyType, string> = {
    FOR_SALE: t("typeForSale"),
    FOR_RENT: t("typeForRent"),
  };

  return (
    <div className="rounded-md border bg-white dark:bg-slate-900">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">{t("image")}</TableHead>
            <TableHead>{t("title")}</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead>{t("type")}</TableHead>
            <TableHead>{t("price")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div className="relative h-10 w-16 overflow-hidden rounded-md">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="line-clamp-1">{property.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {property.location}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    property.status === "ACTIVE" ? "default" : "secondary"
                  }
                >
                  {statusMap[property.status]}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="capitalize">{typeMap[property.type]}</span>
              </TableCell>
              <TableCell>{property.price}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{t("actionsLabel")}</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/listings/${property.slug}`}>
                        <Eye className="mr-2 h-4 w-4" /> {t("viewLive")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/edit/${property.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        {t("edit")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={async () => {
                        if (!session?.user) return;
                        if (confirm(t("deleteConfirm"))) {
                          try {
                            await deleteProperty(
                              property.id,
                              session?.user.id as string,
                            );
                          } catch (error) {
                            toast.error(
                              error instanceof Error
                                ? error.message
                                : String(error),
                            );
                          }
                        }
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" /> {t("delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
