import { eq } from "drizzle-orm";
import { db } from "@/db";
import { contactRequests } from "@/db/schema";
import { sendNotification } from "@/lib/notifications";
import {
  emptyContact,
  hasErrors,
  referenceCode,
  validateContact,
  type ContactInput,
} from "@/lib/validation";

export const dynamic = "force-dynamic";

function clean(value: unknown, max = 300): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "We could not read that request. Please try again." },
      { status: 400 },
    );
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const input: ContactInput = {
    ...emptyContact,
    fullName: clean(raw.fullName, 200),
    phone: clean(raw.phone, 40),
    email: clean(raw.email, 200),
    propertyAddress: clean(raw.propertyAddress, 300),
    service: clean(raw.service, 120),
    message: clean(raw.message, 4000),
  };

  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return Response.json(
      {
        ok: false,
        errors,
        message: "Please correct the highlighted fields and submit again.",
      },
      { status: 422 },
    );
  }

  try {
    const [saved] = await db
      .insert(contactRequests)
      .values({
        fullName: input.fullName,
        phone: input.phone,
        email: input.email,
        propertyAddress: input.propertyAddress || null,
        service: input.service,
        message: input.message,
        source: clean(raw.source, 60) || "website",
      })
      .returning({ id: contactRequests.id });

    const reference = referenceCode("RV-MSG", saved.id);

    const notification = await sendNotification({
      kind: "contact",
      reference,
      subject: "New property service inquiry",
      fields: {
        Name: input.fullName,
        Phone: input.phone,
        Email: input.email,
        "Property address": input.propertyAddress,
        Service: input.service,
        Message: input.message,
      },
    });

    if (notification.delivered) {
      await db
        .update(contactRequests)
        .set({ notified: true })
        .where(eq(contactRequests.id, saved.id));
    }

    return Response.json(
      {
        ok: true,
        reference,
        notification: {
          delivered: notification.delivered,
          channel: notification.channel,
          reason: notification.reason ?? null,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("contact_request_failed", error);
    return Response.json(
      {
        ok: false,
        message:
          "We could not submit your request right now. Please try again, or call us directly.",
      },
      { status: 500 },
    );
  }
}
