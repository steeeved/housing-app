import { and, asc, eq } from "drizzle-orm";

import type { Listing } from "@/data/listings";
import { getDatabase } from "@/db/client";
import { inquiries, listings } from "@/db/schema";

export async function readListings(): Promise<Listing[]> {
  const rows = await getDatabase()
    .select()
    .from(listings)
    .orderBy(asc(listings.rentKes));

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    area: `${row.area}, ${row.county}`,
    rent: row.rentKes,
    bedrooms: row.bedrooms,
    status: row.status,
  }));
}

type NewInquiry = {
  listingId: string;
  displayName: string;
  message: string;
};

export async function saveInquiry(input: NewInquiry) {
  const database = getDatabase();
  const [listing] = await database
    .select({ id: listings.id, title: listings.title })
    .from(listings)
    .where(and(eq(listings.id, input.listingId), eq(listings.status, "available")))
    .limit(1);

  if (!listing) {
    return null;
  }

  await database.insert(inquiries).values(input);
  return listing;
}
