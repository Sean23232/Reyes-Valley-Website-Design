/**
 * Shared validation helpers. The exact same rules run in the browser (instant
 * inline feedback) and on the server (authoritative check) so the two can
 * never drift apart.
 */

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const digits = countDigits(value);
  return digits >= 10 && digits <= 15;
}

export function isValidZip(value: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(value.trim());
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
}

function req(value: string | undefined | null): string {
  return (value ?? "").trim();
}

export type AppointmentInput = {
  appointmentType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  consent: boolean;
};

export const emptyAppointment: AppointmentInput = {
  appointmentType: "phone",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  propertyAddress: "",
  city: "",
  state: "CA",
  zipCode: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
  consent: false,
};

export const appointmentFieldOrder: (keyof AppointmentInput)[] = [
  "appointmentType",
  "firstName",
  "lastName",
  "phone",
  "email",
  "propertyAddress",
  "city",
  "state",
  "zipCode",
  "service",
  "preferredDate",
  "preferredTime",
  "notes",
  "consent",
];

export function validateAppointment(input: AppointmentInput): FieldErrors {
  const errors: FieldErrors = {};
  const inPerson = input.appointmentType === "in-person";

  if (input.appointmentType !== "phone" && input.appointmentType !== "in-person") {
    errors.appointmentType = "Select a phone or in-person appointment.";
  }
  if (!req(input.firstName)) errors.firstName = "Enter your first name.";
  if (!req(input.lastName)) errors.lastName = "Enter your last name.";

  if (!req(input.phone)) {
    errors.phone = inPerson
      ? "Enter a phone number we can reach you at."
      : "Enter the phone number you would like us to call.";
  } else if (!isValidPhone(input.phone)) {
    errors.phone = "Enter a valid phone number with at least 10 digits.";
  }

  if (!req(input.email)) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }

  // The property address block is required for in-person visits, optional
  // (but encouraged) for phone appointments.
  if (inPerson) {
    if (!req(input.propertyAddress)) {
      errors.propertyAddress = "Enter the property address for the visit.";
    }
    if (!req(input.city)) errors.city = "Enter the city.";
    if (!req(input.state)) errors.state = "Enter the state.";
    if (!req(input.zipCode)) {
      errors.zipCode = "Enter the ZIP code.";
    } else if (!isValidZip(input.zipCode)) {
      errors.zipCode = "Enter a 5-digit ZIP code.";
    }
  } else if (req(input.zipCode) && !isValidZip(input.zipCode)) {
    errors.zipCode = "Enter a 5-digit ZIP code.";
  }

  if (!req(input.service)) errors.service = "Choose the service you need.";

  if (!req(input.preferredDate)) {
    errors.preferredDate = "Choose a preferred date.";
  } else if (!isValidDate(input.preferredDate)) {
    errors.preferredDate = "Choose a valid date.";
  }

  if (!req(input.preferredTime)) {
    errors.preferredTime = "Choose a preferred time.";
  }

  if (!input.consent) {
    errors.consent = "Please confirm that we may contact you about this request.";
  }

  return errors;
}

export type ContactInput = {
  fullName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  service: string;
  message: string;
};

export const emptyContact: ContactInput = {
  fullName: "",
  phone: "",
  email: "",
  propertyAddress: "",
  service: "",
  message: "",
};

export const contactFieldOrder: (keyof ContactInput)[] = [
  "fullName",
  "phone",
  "email",
  "propertyAddress",
  "service",
  "message",
];

export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!req(input.fullName)) errors.fullName = "Enter your full name.";

  if (!req(input.phone)) {
    errors.phone = "Enter a phone number we can reach you at.";
  } else if (!isValidPhone(input.phone)) {
    errors.phone = "Enter a valid phone number with at least 10 digits.";
  }

  if (!req(input.email)) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }

  if (!req(input.service)) errors.service = "Choose the service you need.";

  if (!req(input.message)) {
    errors.message = "Tell us briefly what you need help with.";
  } else if (req(input.message).length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Formats a database id into a human friendly reference code. */
export function referenceCode(prefix: string, id: number): string {
  return `${prefix}-${String(id).padStart(5, "0")}`;
}
