CREATE TABLE agencies (
  id text PRIMARY KEY,
  name text NOT NULL,
  county text NOT NULL
);

CREATE TABLE listings (
  id text PRIMARY KEY,
  agency_id text NOT NULL REFERENCES agencies(id),
  title text NOT NULL,
  area text NOT NULL,
  county text NOT NULL,
  rent_kes integer NOT NULL CHECK (rent_kes > 0),
  bedrooms integer NOT NULL CHECK (bedrooms >= 0),
  status text NOT NULL CHECK (status IN ('available', 'let'))
);

CREATE TABLE inquiries (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  listing_id text NOT NULL REFERENCES listings(id),
  display_name text NOT NULL,
  message text NOT NULL
);
