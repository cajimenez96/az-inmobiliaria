import "dotenv/config";
import { hashPassword } from "better-auth/crypto";
import type { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { defaultConfig } from "@/lib/company";
import { randomUUID } from "node:crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin123!";
const ADMIN_NAME = process.env.ADMIN_NAME ?? "Admin";

async function main() {
  // 1. Información de la empresa desde config/company.json si no existe
  const existingConfig = await prisma.companyConfig.findFirst();
  if (!existingConfig) {
    await prisma.companyConfig.create({
      data: { data: defaultConfig as unknown as Prisma.InputJsonValue },
    });
    console.log("Seeded company config from config/company.json");
  } else {
    console.log("Company config already exists.");
  }

  // 2. Usuario administrativo: crear si no existe (User + Account para Better Auth)
  const adminUser = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!adminUser) {
    const userId = randomUUID();
    const accountId = randomUUID();
    const hashedPassword = await hashPassword(ADMIN_PASSWORD);

    await prisma.user.create({
      data: {
        id: userId,
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "AGENT",
      },
    });

    await prisma.account.create({
      data: {
        id: accountId,
        accountId: ADMIN_EMAIL,
        providerId: "credential",
        userId,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`Created admin user: ${ADMIN_NAME} (${ADMIN_EMAIL}). Role: AGENT.`);
  } else {
    console.log(`Admin user already exists: ${adminUser.name} (${adminUser.email}).`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
