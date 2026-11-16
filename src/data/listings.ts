export type Listing = {
  id: string;
  title: string;
  area: string;
  rent: number;
  bedrooms: number;
  status: "available" | "let";
};

export const listings: Listing[] = [
  { id: "kenol-bedsitter", title: "Bedsitter", area: "Kenol, Murang'a", rent: 4500, bedrooms: 0, status: "available" },
  { id: "kiganjo-one-bed", title: "One bedroom", area: "Kiganjo, Nyeri", rent: 9000, bedrooms: 1, status: "available" },
  { id: "milimani-two-bed", title: "Two bedrooms", area: "Milimani, Kisumu", rent: 18000, bedrooms: 2, status: "available" },
  { id: "makuyu-single-room", title: "Single room", area: "Makuyu, Murang'a", rent: 3000, bedrooms: 0, status: "let" },
  { id: "kamakwa-three-bed", title: "Three bedrooms", area: "Kamakwa, Nyeri", rent: 25000, bedrooms: 3, status: "available" },
  { id: "nyali-one-bed", title: "One bedroom", area: "Nyali, Mombasa", rent: 22000, bedrooms: 1, status: "let" },
];
