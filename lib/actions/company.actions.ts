"use server";

import { revalidatePath } from "next/cache";
import type { CompanyConfig } from "@/lib/company";
import { saveCompanyConfig } from "@/lib/company";

export async function updateCompanyConfig(data: CompanyConfig): Promise<{ ok: boolean; error?: string }> {
  try {
    await saveCompanyConfig(data);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (e) {
    console.error("updateCompanyConfig", e);
    return { ok: false, error: e instanceof Error ? e.message : "Failed to save" };
  }
}
