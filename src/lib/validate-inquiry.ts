// Server and browser share these limits, but only the server is trusted.
export const LIMITS = { listingId: 100, name: 80, message: 500 } as const;

export type InquiryInput = {
  listingId?: unknown;
  displayName?: unknown;
  message?: unknown;
};

export type ValidInquiry = {
  listingId: string;
  displayName: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; value: ValidInquiry }
  | { ok: false; message: string };

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const EMAIL_LIKE = /\S+@\S+\.\S+/;
// Nine or more digits in a row, even with spaces or dashes between them.
const PHONE_LIKE = /(?:\d[\s-]?){9,}/;

function fail(message: string): ValidationResult {
  return { ok: false, message };
}

export function validateInquiry(input: InquiryInput): ValidationResult {
  if (
    typeof input.listingId !== "string" ||
    input.listingId.length === 0 ||
    input.listingId.length > LIMITS.listingId
  ) {
    return fail("Choose an available sample home.");
  }

  const name = typeof input.displayName === "string" ? input.displayName.trim() : "";
  if (name.length < 2) {
    return fail("Use an invented name with at least 2 characters.");
  }
  if (name.length > LIMITS.name) {
    return fail(`Keep the invented name to ${LIMITS.name} characters or fewer.`);
  }

  const message = typeof input.message === "string" ? input.message.trim() : "";
  if (message.length < 10) {
    return fail("Write an invented message with at least 10 characters.");
  }
  if (message.length > LIMITS.message) {
    return fail(`Keep the invented message to ${LIMITS.message} characters or fewer.`);
  }

  if (CONTROL_CHARACTERS.test(name) || CONTROL_CHARACTERS.test(message)) {
    return fail("Use plain text only.");
  }

  // A guess, not a guarantee. It catches the obvious cases so a real contact detail is not stored.
  if (EMAIL_LIKE.test(name) || EMAIL_LIKE.test(message) || PHONE_LIKE.test(name) || PHONE_LIKE.test(message)) {
    return fail("Use invented details only. Do not type a real email address or phone number.");
  }

  return { ok: true, value: { listingId: input.listingId, displayName: name, message } };
}
