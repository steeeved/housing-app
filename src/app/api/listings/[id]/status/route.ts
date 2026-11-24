import { updateAgencyListingStatus } from "@/db/queries";
import { auth } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return Response.json({ error: "Sign in required." }, { status: 401 });
  }

  if (!session.user.agencyId || session.user.role !== "manager") {
    return Response.json({ error: "Manager permission required." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON status." }, { status: 400 });
  }

  const status = typeof body === "object" && body !== null && "status" in body
    ? (body as { status?: unknown }).status
    : undefined;

  if (status !== "available" && status !== "let") {
    return Response.json({ error: "Status must be available or let." }, { status: 400 });
  }

  const { id } = await context.params;
  const updated = await updateAgencyListingStatus({
    agencyId: session.user.agencyId,
    listingId: id,
    status,
  });

  if (!updated) {
    return Response.json({ error: "Listing not found." }, { status: 404 });
  }

  return Response.json({ listing: updated });
}
