SELECT id, title, county, rent_kes, bedrooms, status
FROM listings
ORDER BY rent_kes;

SELECT listings.title, agencies.name AS agency
FROM listings
JOIN agencies ON agencies.id = listings.agency_id
ORDER BY listings.title;

INSERT INTO listings (id, agency_id, title, area, county, rent_kes, bedrooms, status)
VALUES ('kisumu-rooftop-studio', 'nyumba-agency', 'Rooftop studio', 'Kondele', 'Kisumu', 7000, 0, 'available');

SELECT title, area, county, rent_kes
FROM listings
WHERE id = 'kisumu-rooftop-studio';
