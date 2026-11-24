ALTER TABLE "user" ADD COLUMN "agency_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'agent' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_agency_id_idx" ON "user" USING btree ("agency_id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_role_allowed" CHECK ("user"."role" IN ('manager', 'agent'));