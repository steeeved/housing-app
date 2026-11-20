CREATE TABLE "agencies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"county" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "inquiries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"listing_id" text NOT NULL,
	"display_name" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "inquiries_display_name_length" CHECK (char_length("inquiries"."display_name") BETWEEN 2 AND 80),
	CONSTRAINT "inquiries_message_length" CHECK (char_length("inquiries"."message") BETWEEN 10 AND 500)
);
--> statement-breakpoint
CREATE TABLE "listings" (
	"id" text PRIMARY KEY NOT NULL,
	"agency_id" text NOT NULL,
	"title" text NOT NULL,
	"area" text NOT NULL,
	"county" text NOT NULL,
	"rent_kes" integer NOT NULL,
	"bedrooms" integer NOT NULL,
	"status" text NOT NULL,
	CONSTRAINT "listings_rent_positive" CHECK ("listings"."rent_kes" > 0),
	CONSTRAINT "listings_bedrooms_nonnegative" CHECK ("listings"."bedrooms" >= 0),
	CONSTRAINT "listings_status_allowed" CHECK ("listings"."status" IN ('available', 'let'))
);
--> statement-breakpoint
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE no action ON UPDATE no action;