import { NextResponse } from "next/server";

import { saveInquiry } from "@/db/queries";
import { validateInquiry, type InquiryInput } from "@/lib/validate-inquiry";

export async function POST(request: Request) {
  let input: InquiryInput;

  try {
    input = (await request.json()) as InquiryInput;
  } catch {
    return NextResponse.json({ message: "Send valid JSON." }, { status: 400 });
  }

  const result = validateInquiry(input ?? {});

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  let saved: Awaited<ReturnType<typeof saveInquiry>>;

  try {
    saved = await saveInquiry(result.value);
  } catch {
    // Log a plain sentence. Never log the error object, which could carry connection details.
    console.error("Saving an inquiry failed.");
    return NextResponse.json(
      { message: "The practice database is not available. Try again in a moment." },
      { status: 503 },
    );
  }

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
