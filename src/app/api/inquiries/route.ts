import { NextResponse } from "next/server";

import { saveInquiry } from "@/db/queries";

type InquiryInput = {
  listingId?: unknown;
  displayName?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let input: InquiryInput;

  try {
    input = (await request.json()) as InquiryInput;
  } catch {
    return NextResponse.json({ message: "Send valid JSON." }, { status: 400 });
  }

  if (typeof input.displayName !== "string" || input.displayName.trim().length < 2) {
    return NextResponse.json(
      { message: "Use an invented name with at least 2 characters." },
      { status: 400 },
    );
  }

  if (input.displayName.trim().length > 80) {
    return NextResponse.json(
      { message: "Keep the invented name to 80 characters or fewer." },
      { status: 400 },
    );
  }

  if (typeof input.message !== "string" || input.message.trim().length < 10) {
    return NextResponse.json(
      { message: "Write an invented message with at least 10 characters." },
      { status: 400 },
    );
  }

  if (input.message.trim().length > 500) {
    return NextResponse.json(
      { message: "Keep the invented message to 500 characters or fewer." },
      { status: 400 },
    );
  }

  if (typeof input.listingId !== "string") {
    return NextResponse.json(
      { message: "Choose an available sample home." },
      { status: 400 },
    );
  }

  const saved = await saveInquiry({
    listingId: input.listingId,
    displayName: input.displayName.trim(),
    message: input.message.trim(),
  });

  if (!saved) {
    return NextResponse.json(
      { message: "Choose an available sample home." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    message: `Your fictional inquiry for ${saved.title} is stored for this class project.`,
    saved: true,
  }, { status: 201 });
}
