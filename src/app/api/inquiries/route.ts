import { NextResponse } from "next/server";

import { listings } from "@/data/listings";

type InquiryInput = {
  listingId?: unknown;
  displayName?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  const input = (await request.json()) as InquiryInput;
  const listing = listings.find(
    (item) => item.id === input.listingId && item.status === "available",
  );

  if (!listing) {
    return NextResponse.json(
      { message: "Choose an available sample home." },
      { status: 400 },
    );
  }

  if (typeof input.displayName !== "string" || input.displayName.trim().length < 2) {
    return NextResponse.json(
      { message: "Use an invented name with at least 2 characters." },
      { status: 400 },
    );
  }

  if (typeof input.message !== "string" || input.message.trim().length < 10) {
    return NextResponse.json(
      { message: "Write an invented message with at least 10 characters." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    message: `The server checked your practice inquiry for ${listing.title}.`,
    saved: false,
  });
}
