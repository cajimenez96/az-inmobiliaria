-- CreateTable
CREATE TABLE "company_config" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_config_pkey" PRIMARY KEY ("id")
);
