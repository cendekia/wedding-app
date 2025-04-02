-- Create enum types
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GUEST');
CREATE TYPE "EventType" AS ENUM ('CEREMONY', 'RECEPTION', 'OTHER');
CREATE TYPE "AttendanceStatus" AS ENUM ('ATTENDING', 'NOT_ATTENDING', 'PENDING');

-- Create tables
CREATE TABLE "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'GUEST',
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Location" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "zipCode" TEXT,
  "country" TEXT NOT NULL,
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Event" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "date" TIMESTAMP WITH TIME ZONE NOT NULL,
  "locationId" UUID NOT NULL REFERENCES "Location"("id") ON DELETE CASCADE,
  "type" "EventType" NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Guest" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "invitationCode" TEXT UNIQUE NOT NULL,
  "plusOneAllowed" BOOLEAN NOT NULL DEFAULT FALSE,
  "dietaryRestrictions" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "RSVP" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "guestId" UUID NOT NULL REFERENCES "Guest"("id") ON DELETE CASCADE,
  "eventId" UUID NOT NULL REFERENCES "Event"("id") ON DELETE CASCADE,
  "status" "AttendanceStatus" NOT NULL,
  "numberOfGuests" INTEGER NOT NULL DEFAULT 1,
  "dietaryRestrictions" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "unique_guest_event" UNIQUE ("guestId", "eventId")
);

CREATE TABLE "Photo" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "url" TEXT NOT NULL,
  "thumbnail" TEXT NOT NULL,
  "title" TEXT,
  "description" TEXT,
  "uploadedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "uploadedById" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE
);

CREATE TABLE "RegistryItem" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "price" DOUBLE PRECISION,
  "url" TEXT,
  "imageUrl" TEXT,
  "purchased" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX "User_email_idx" ON "User"("email");
CREATE INDEX "Guest_invitationCode_idx" ON "Guest"("invitationCode");
CREATE INDEX "RSVP_guestId_idx" ON "RSVP"("guestId");
CREATE INDEX "RSVP_eventId_idx" ON "RSVP"("eventId");
CREATE INDEX "Event_locationId_idx" ON "Event"("locationId");
CREATE INDEX "Photo_uploadedById_idx" ON "Photo"("uploadedById");

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_location_updated_at BEFORE UPDATE ON "Location" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_event_updated_at BEFORE UPDATE ON "Event" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_guest_updated_at BEFORE UPDATE ON "Guest" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_rsvp_updated_at BEFORE UPDATE ON "RSVP" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_registry_item_updated_at BEFORE UPDATE ON "RegistryItem" FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column(); 