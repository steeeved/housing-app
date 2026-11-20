export type Listing = {
  id: string;
  title: string;
  area: string;
  rent: number;
  bedrooms: number;
  status: "available" | "let";
};
