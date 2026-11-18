# Nyumba data plan

## Agency

- Facts: name, county and fictional phone number.
- Has many agents and many listings.

## Agent

- Facts: name and email address.
- Belongs to one agency.

## Listing

- Facts: title, area, rent in KES, bedrooms and status (`available` or `let`).
- Belongs to one agency and has many inquiries.

## Inquiry

- Facts: name, message and date.
- Belongs to one listing.

All examples and test records are fictional. Secrets do not belong in plan files.
