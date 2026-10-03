import { eq } from "drizzle-orm";
import { db } from "@/db";
import { appointmentRequests } from "@/db/schema";
import { sendNotification } from "@/lib/notifications";
import {
  emptyAppointment,
  hasErrors,
  referenceCode,
  validateAppointment,
  type AppointmentInput,
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
  const input: AppointmentInput = {
    ...emptyAppointment,
    appointmentType: clean(raw.appointmentType, 20) || "phone",
    firstName: clean(raw.firstName, 120),
    lastName: clean(raw.lastName, 120),
    phone: clean(raw.phone, 40),
    email: clean(raw.email, 200),
    propertyAddress: clean(raw.propertyAddress, 300),
    city: clean(raw.city, 120),
    state: clean(raw.state, 60),
    zipCode: clean(raw.zipCode, 20),
    service: clean(raw.service, 120),
    preferredDate: clean(raw.preferredDate, 20),
    preferredTime: clean(raw.preferredTime, 40),
    notes: clean(raw.notes, 2000),
    consent: raw.consent === true,
  };

  const errors = validateAppointment(input);
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
      .insert(appointmentRequests)
      .values({
        appointmentType: input.appointmentType,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        email: input.email,
        propertyAddress: input.propertyAddress || null,
        city: input.city || null,
        state: input.state || null,
        zipCode: input.zipCode || null,
        service: input.service,
        preferredDate: input.preferredDate,
        preferredTime: input.preferredTime,
        notes: input.notes || null,
        consent: input.consent,
        source: clean(raw.source, 60) || "website",
      })
      .returning({ id: appointmentRequests.id });

    const reference = referenceCode("RV-APT", saved.id);

    const notification = await sendNotification({
      kind: "appointment",
      reference,
      subject: `New ${
        input.appointmentType === "in-person" ? "in-person" : "phone"
      } appointment request`,
      fields: {
        "Appointment type":
          input.appointmentType === "in-person"
            ? "In-person appointment"
            : "Phone appointment",
        Name: `${input.firstName} ${input.lastName}`,
        Phone: input.phone,
        Email: input.email,
        "Property address": [input.propertyAddress, input.city, input.state, input.zipCode]
          .filter(Boolean)
          .join(", "),
        Service: input.service,
        "Preferred date": input.preferredDate,
        "Preferred time": input.preferredTime,
        Notes: input.notes,
      },
    });

    if (notification.delivered) {
      await db
        .update(appointmentRequests)
        .set({ notified: true })
        .where(eq(appointmentRequests.id, saved.id));
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
    console.error("appointment_request_failed", error);
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
