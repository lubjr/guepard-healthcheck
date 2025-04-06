-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "checkInterval" INTEGER NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusEntry" (
    "id" TEXT NOT NULL,
    "online" BOOLEAN NOT NULL,
    "statusCode" INTEGER,
    "responseTime" INTEGER,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targetId" TEXT NOT NULL,

    CONSTRAINT "StatusEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatusEntry" ADD CONSTRAINT "StatusEntry_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
