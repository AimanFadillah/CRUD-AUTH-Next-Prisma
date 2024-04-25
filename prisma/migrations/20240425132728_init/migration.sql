-- CreateTable
CREATE TABLE "Barang" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
