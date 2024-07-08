-- -------------------------------------------------------------
-- TablePlus 6.1.0(565)
--
-- https://tableplus.com/
--
-- Database: parking_db
-- Generation Time: 2024-07-07 21:23:24.6180
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."bookings";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."bookings" (
    "id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "start_date" timestamptz NOT NULL,
    "end_date" timestamptz NOT NULL,
    "parking_spot_id" uuid NOT NULL,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."parking_spots";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."parking_spots" (
    "id" uuid NOT NULL,
    "name" varchar(255) NOT NULL,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "first_name" varchar(255) NOT NULL,
    "last_name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "role" varchar(255) NOT NULL,
    "token" varchar(255) NOT NULL,
    "created_at" timestamptz NOT NULL,
    "updated_at" timestamptz NOT NULL,
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."bookings" ADD FOREIGN KEY ("parking_spot_id") REFERENCES "public"."parking_spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."bookings" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Indices
CREATE UNIQUE INDEX bookings_start_date_end_date_parking_spot_id_key ON public.bookings USING btree (start_date, end_date, parking_spot_id);


-- Indices
CREATE UNIQUE INDEX parking_spots_name_key ON public.parking_spots USING btree (name);


-- Indices
CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
