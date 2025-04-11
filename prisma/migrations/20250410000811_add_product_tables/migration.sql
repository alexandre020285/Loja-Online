-- CreateTable
CREATE TABLE "eletronics" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "sizes" VARCHAR(255) NOT NULL,

    CONSTRAINT "eletronics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensclothing" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "sizes" VARCHAR(255) NOT NULL,

    CONSTRAINT "mensclothing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensshoes" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "sizes" VARCHAR(255) NOT NULL,

    CONSTRAINT "mensshoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toys" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "sizes" VARCHAR(255) NOT NULL,

    CONSTRAINT "toys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "womensclothing" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "sizes" VARCHAR(255) NOT NULL,

    CONSTRAINT "womensclothing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "womenshoes" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "sizes" VARCHAR(255) NOT NULL,

    CONSTRAINT "womenshoes_pkey" PRIMARY KEY ("id")
);
