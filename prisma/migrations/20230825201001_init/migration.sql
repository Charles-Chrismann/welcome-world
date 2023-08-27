-- CreateTable
CREATE TABLE "Ip" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ip" TEXT NOT NULL,
    "remote_user" TEXT NOT NULL,
    "horo" TIMESTAMP(3) NOT NULL,
    "methode" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "referer" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "forwarded_for" TEXT NOT NULL,

    CONSTRAINT "Ip_pkey" PRIMARY KEY ("id")
);
