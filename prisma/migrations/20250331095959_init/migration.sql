-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GUEST');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CEREMONY', 'RECEPTION', 'OTHER');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('ATTENDING', 'NOT_ATTENDING', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GUEST',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "locationId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "invitationCode" TEXT NOT NULL,
    "plusOneAllowed" BOOLEAN NOT NULL DEFAULT false,
    "dietaryRestrictions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RSVP" (
    "id" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "numberOfGuests" INTEGER NOT NULL DEFAULT 1,
    "dietaryRestrictions" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedById" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "url" TEXT,
    "imageUrl" TEXT,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_invitationCode_key" ON "Guest"("invitationCode");

-- CreateIndex
CREATE UNIQUE INDEX "RSVP_guestId_eventId_key" ON "RSVP"("guestId", "eventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSVP" ADD CONSTRAINT "RSVP_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSVP" ADD CONSTRAINT "RSVP_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
