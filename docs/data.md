# Nyumba data plan

## Agency

- Facts: name, county and fictional phone number.
- Has many agents and many listings.

## Agent

- Facts: name and email address.
- Belongs to one agency.
- Planned for Chapter 9, where Better Auth stores the agent as an authenticated user. Chapter 8 does not create a second, competing agent table.

## Listing

- Facts: title, area, rent in KES, bedrooms and status (`available` or `let`).
- Belongs to one agency and has many inquiries.

## Inquiry

- Facts: name, message and creation date.
- Belongs to one listing.

All examples and test records are fictional. Secrets do not belong in plan files.
