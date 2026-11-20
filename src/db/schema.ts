import { sql } from "drizzle-orm";
import { bigint, check, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const agencies = pgTable("agencies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  county: text("county").notNull(),
});

export const listings = pgTable(
  "listings",
  {
    id: text("id").primaryKey(),
    agencyId: text("agency_id").notNull().references(() => agencies.id),
    title: text("title").notNull(),
    area: text("area").notNull(),
    county: text("county").notNull(),
    rentKes: integer("rent_kes").notNull(),
    bedrooms: integer("bedrooms").notNull(),
    status: text("status", { enum: ["available", "let"] }).notNull(),
  },
  (table) => [
    check("listings_rent_positive", sql`${table.rentKes} > 0`),
    check("listings_bedrooms_nonnegative", sql`${table.bedrooms} >= 0`),
    check("listings_status_allowed", sql`${table.status} IN ('available', 'let')`),
  ],
);

export const inquiries = pgTable(
  "inquiries",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    listingId: text("listing_id").notNull().references(() => listings.id),
    displayName: text("display_name").notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    check("inquiries_display_name_length", sql`char_length(${table.displayName}) BETWEEN 2 AND 80`),
    check("inquiries_message_length", sql`char_length(${table.message}) BETWEEN 10 AND 500`),
  ],
);
