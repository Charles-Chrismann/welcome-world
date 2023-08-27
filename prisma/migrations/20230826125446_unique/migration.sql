/*
  Warnings:

  - A unique constraint covering the columns `[country]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[countryCode]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ip]` on the table `Ip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isp]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[org]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[as]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[timezone]` on the table `Timezone` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Country_country_key" ON "Country"("country");

-- CreateIndex
CREATE UNIQUE INDEX "Country_countryCode_key" ON "Country"("countryCode");

-- CreateIndex
CREATE UNIQUE INDEX "Ip_ip_key" ON "Ip"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_isp_key" ON "Organization"("isp");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_org_key" ON "Organization"("org");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_as_key" ON "Organization"("as");

-- CreateIndex
CREATE UNIQUE INDEX "Timezone_timezone_key" ON "Timezone"("timezone");
