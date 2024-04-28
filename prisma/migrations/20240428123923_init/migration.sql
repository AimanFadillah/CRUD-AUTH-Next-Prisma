/*
  Warnings:

  - Added the required column `foto` to the `Barang` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Barang" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "foto" TEXT NOT NULL
);
INSERT INTO "new_Barang" ("id", "nama") SELECT "id", "nama" FROM "Barang";
DROP TABLE "Barang";
ALTER TABLE "new_Barang" RENAME TO "Barang";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
