import { and, asc, eq } from "drizzle-orm";

import type { Listing } from "@/data/listings";
import { getDatabase } from "@/db/client";
import { agencies, inquiries, listings } from "@/db/schema";

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

export async function readAgencyDashboard(agencyId: string) {
  const database = getDatabase();
  const [agency] = await database
    .select({ id: agencies.id, name: agencies.name, county: agencies.county })
    .from(agencies)
    .where(eq(agencies.id, agencyId))
    .limit(1);

  if (!agency) {
    return null;
  }

  const agencyListings = await database
    .select({
      id: listings.id,
      title: listings.title,
      area: listings.area,
      county: listings.county,
      rentKes: listings.rentKes,
      status: listings.status,
    })
    .from(listings)
    .where(eq(listings.agencyId, agencyId))
    .orderBy(asc(listings.title));

  return { agency, listings: agencyListings };
}

type ListingStatus = "available" | "let";

export async function updateAgencyListingStatus(input: {
  agencyId: string;
  listingId: string;
  status: ListingStatus;
}) {
  const [updated] = await getDatabase()
    .update(listings)
    .set({ status: input.status })
    .where(and(eq(listings.id, input.listingId), eq(listings.agencyId, input.agencyId)))
    .returning({ id: listings.id, status: listings.status });

  return updated ?? null;
}
