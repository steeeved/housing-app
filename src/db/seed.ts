import { closeDatabase, getDatabase } from "./client";
import { agencies, listings } from "./schema";

const database = getDatabase();

await database
  .insert(agencies)
  .values({ id: "nyumba-agency", name: "Nyumba Agency", county: "Murang'a" })
  .onConflictDoNothing();

await database
  .insert(listings)
  .values([
    { id: "kenol-bedsitter", agencyId: "nyumba-agency", title: "Bedsitter", area: "Kenol", county: "Murang'a", rentKes: 4500, bedrooms: 0, status: "available" },
    { id: "kiganjo-one-bed", agencyId: "nyumba-agency", title: "One bedroom", area: "Kiganjo", county: "Nyeri", rentKes: 9000, bedrooms: 1, status: "available" },
    { id: "milimani-two-bed", agencyId: "nyumba-agency", title: "Two bedrooms", area: "Milimani", county: "Kisumu", rentKes: 18000, bedrooms: 2, status: "available" },
    { id: "makuyu-single-room", agencyId: "nyumba-agency", title: "Single room", area: "Makuyu", county: "Murang'a", rentKes: 3000, bedrooms: 0, status: "let" },
    { id: "kamakwa-three-bed", agencyId: "nyumba-agency", title: "Three bedrooms", area: "Kamakwa", county: "Nyeri", rentKes: 25000, bedrooms: 3, status: "available" },
    { id: "nyali-one-bed", agencyId: "nyumba-agency", title: "One bedroom", area: "Nyali", county: "Mombasa", rentKes: 22000, bedrooms: 1, status: "let" },
  ])
  .onConflictDoNothing();

console.log("Seeded six fictional listings.");
await closeDatabase();
