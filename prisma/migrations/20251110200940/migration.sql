/*
  Warnings:

  - Made the column `city` on table `Pet` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL;
