/*
  Warnings:

  - Added the required column `city` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
