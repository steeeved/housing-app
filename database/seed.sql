INSERT INTO agencies (id, name, county)
VALUES ('nyumba-agency', 'Nyumba Agency', 'Murang''a');

INSERT INTO listings (id, agency_id, title, area, county, rent_kes, bedrooms, status)
VALUES
  ('kenol-bedsitter', 'nyumba-agency', 'Bedsitter', 'Kenol', 'Murang''a', 4500, 0, 'available'),
  ('kiganjo-one-bed', 'nyumba-agency', 'One bedroom', 'Kiganjo', 'Nyeri', 9000, 1, 'available'),
  ('milimani-two-bed', 'nyumba-agency', 'Two bedrooms', 'Milimani', 'Kisumu', 18000, 2, 'available'),
  ('makuyu-single-room', 'nyumba-agency', 'Single room', 'Makuyu', 'Murang''a', 3000, 0, 'let'),
  ('kamakwa-three-bed', 'nyumba-agency', 'Three bedrooms', 'Kamakwa', 'Nyeri', 25000, 3, 'available'),
  ('nyali-one-bed', 'nyumba-agency', 'One bedroom', 'Nyali', 'Mombasa', 22000, 1, 'let');
