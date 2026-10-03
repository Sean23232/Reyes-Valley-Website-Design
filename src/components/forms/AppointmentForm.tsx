"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircleIcon,
  PhoneCalendarIcon,
  PhoneIcon,
  PinCalendarIcon,
  SpinnerIcon,
} from "@/components/Icons";
import {
  ErrorSummary,
  SelectField,
  TextField,
  TextareaField,
} from "@/components/forms/Fields";
import { btn } from "@/components/ui/buttonStyles";
import { BOOKING_EVENT, type BookingIntent } from "@/lib/booking-bus";
import { appointmentServiceOptions } from "@/lib/services";
import { siteConfig, telHref } from "@/lib/site";
import {
  emptyAppointment,
  hasErrors,
  validateAppointment,
  type AppointmentInput,
  type FieldErrors,
} from "@/lib/validation";

const TIME_OPTIONS = [
  "Morning (8:00 AM – 11:00 AM)",
  "Midday (11:00 AM – 1:00 PM)",
  "Afternoon (1:00 PM – 4:00 PM)",
  "Late afternoon (4:00 PM – 6:00 PM)",
  "Flexible — any available time",
];

const ID = "apt";
type Status = "idle" | "submitting" | "success" | "error";

type SubmitResult = {
  reference: string;
  notification: { delivered: boolean; channel: string; reason: string | null };
};

type Props = {
  initialType?: "phone" | "in-person";
  initialService?: string;
  /** Shows the "Back to Home" link on the confirmation screen. */
  showHomeLink?: boolean;
};

export default function AppointmentForm({
  initialType = "phone",
  initialService = "",
  showHomeLink = true,
}: Props) {
  const [values, setValues] = useState<AppointmentInput>({
    ...emptyAppointment,
    appointmentType: initialType,
    service: initialService,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const confirmationRef = useRef<HTMLDivElement | null>(null);

  const inPerson = values.appointmentType === "in-person";

  const minDate = useMemo(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }, []);

  // Keeps the newest values available to blur handlers without re-creating them.
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const setField = useCallback(
    <K extends keyof AppointmentInput>(key: K, value: AppointmentInput[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      // Clear an existing error as soon as the visitor edits the field; it is
      // re-checked on blur and on submit.
      setErrors((prev) => {
        if (!prev[key as string]) return prev;
        const updated = { ...prev };
        delete updated[key as string];
        return updated;
      });
    },
    [],
  );

  const handleBlur = useCallback((key: keyof AppointmentInput) => {
    const fresh = validateAppointment(valuesRef.current);
    setErrors((prev) => {
      const updated = { ...prev };
      if (fresh[key as string]) updated[key as string] = fresh[key as string];
      else delete updated[key as string];
      return updated;
    });
  }, []);

  // Respond to "Book an Appointment" CTAs anywhere on the page.
  useEffect(() => {
    const onIntent = (event: Event) => {
      const detail = (event as CustomEvent<BookingIntent>).detail ?? {};
      setStatus((prev) => (prev === "success" ? "idle" : prev));
      setValues((prev) => ({
        ...prev,
        appointmentType: detail.appointmentType ?? prev.appointmentType,
        service: detail.service ?? prev.service,
      }));
      if (detail.appointmentType || detail.service) {
        window.setTimeout(() => {
          const target = document.getElementById(
            detail.appointmentType ? `${ID}-type-${detail.appointmentType}` : `${ID}-firstName`,
          );
          target?.focus({ preventScroll: true });
        }, 450);
      }
    };
    window.addEventListener(BOOKING_EVENT, onIntent);
    return () => window.removeEventListener(BOOKING_EVENT, onIntent);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateAppointment(values);
    setErrors(found);
    setServerMessage(null);

    if (hasErrors(found)) {
      setStatus("idle");
      const firstKey = Object.keys(found)[0];
      const node = document.getElementById(
        firstKey === "appointmentType" ? `${ID}-type-phone` : `${ID}-${firstKey}`,
      );
      node?.focus();
      node?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(siteConfig.endpoints.appointments, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "website-appointment-form" }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        errors?: FieldErrors;
        message?: string;
        reference?: string;
        notification?: SubmitResult["notification"];
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerMessage(
          data.message ?? "We could not submit your request. Please try again.",
        );
        setStatus("error");
        return;
      }

      setResult({
        reference: data.reference ?? "",
        notification:
          data.notification ?? { delivered: false, channel: "none", reason: null },
      });
      setStatus("success");
      window.setTimeout(() => {
        confirmationRef.current?.focus();
        confirmationRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 60);
    } catch {
      setServerMessage(
        "We could not reach the server. Please check your connection and try again, or call us directly.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        id="appointment-form"
        ref={confirmationRef}
        tabIndex={-1}
        className="rounded-2xl border border-navy-900/10 bg-white p-7 shadow-[var(--shadow-card)] sm:p-10"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-clay-50 text-clay-600">
          <CheckCircleIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-navy-900 sm:text-3xl">
          Appointment Request Received
        </h3>
        <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ash-700">
          Thank you for contacting Reyes Valley Property Management &amp; Maintenance.
          We&rsquo;ve received your appointment request and will follow up using the
          contact information you provided.
        </p>

        <dl className="mt-6 grid gap-3 rounded-lg border border-navy-900/10 bg-sand-50 p-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
              Reference
            </dt>
            <dd className="mt-1 font-display font-bold text-navy-900">
              {result?.reference}
            </dd>
          </div>
          <div>
            <dt className="text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
              Appointment type
            </dt>
            <dd className="mt-1 font-medium text-navy-900">
              {inPerson ? "In-person appointment" : "Phone appointment"}
            </dd>
          </div>
          <div>
            <dt className="text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
              Preferred time
            </dt>
            <dd className="mt-1 font-medium text-navy-900">
              {values.preferredDate} · {values.preferredTime}
            </dd>
          </div>
        </dl>

        {result && !result.notification.delivered ? (
          <p className="mt-5 rounded-lg border border-navy-900/10 bg-white px-4 py-3 text-xs leading-relaxed text-ash-600">
            <span className="font-semibold text-navy-900">Site setup note:</span> your
            request has been securely recorded in the website database. Automatic email
            or SMS forwarding is not connected yet, so no notification email was sent.
            Connect a delivery service in{" "}
            <code className="rounded bg-sand-100 px-1 py-0.5">src/lib/notifications.ts</code>{" "}
            to enable it.
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {showHomeLink ? (
            <Link href="/" className={btn("navy", "md", "sm:min-w-[180px]")}>
              Back to Home
            </Link>
          ) : null}
          <a href={telHref} className={btn("accent", "md")}>
            <PhoneIcon className="h-[18px] w-[18px]" />
            Call Now · {siteConfig.phone.display}
          </a>
          <button
            type="button"
            onClick={() => {
              setValues({ ...emptyAppointment, appointmentType: values.appointmentType });
              setErrors({});
              setResult(null);
              setStatus("idle");
            }}
            className={btn("outline", "md")}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="appointment-form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="booking-form-heading"
      className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-[var(--shadow-card)] sm:p-8 lg:p-10"
    >
      <h3 id="booking-form-heading" className="sr-only">
        Appointment request form
      </h3>

      {status === "error" || hasErrors(errors) ? (
        <ErrorSummary
          errors={errors}
          idPrefix={ID}
          message={serverMessage ?? undefined}
        />
      ) : null}

      {/* Appointment type */}
      <fieldset>
        <legend className="mb-3 text-[0.82rem] font-semibold uppercase tracking-[0.07em] text-ash-700">
          Appointment Type <span className="text-clay-600">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              value: "phone" as const,
              label: "Phone Appointment",
              body: "We call you at a time that works.",
              icon: PhoneCalendarIcon,
            },
            {
              value: "in-person" as const,
              label: "In-Person Appointment",
              body: "We meet you at the property.",
              icon: PinCalendarIcon,
            },
          ].map((option) => {
            const Icon = option.icon;
            const checked = values.appointmentType === option.value;
            return (
              <label
                key={option.value}
                htmlFor={`${ID}-type-${option.value}`}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all ${
                  checked
                    ? "border-clay-600 bg-clay-50 ring-1 ring-clay-600"
                    : "border-navy-900/15 bg-white hover:border-navy-900/35"
                }`}
              >
                <input
                  type="radio"
                  id={`${ID}-type-${option.value}`}
                  name="appointmentType"
                  value={option.value}
                  checked={checked}
                  onChange={() => setField("appointmentType", option.value)}
                  className="mt-1 h-4 w-4 accent-[#9c571f]"
                />
                <span className="flex-1">
                  <span className="flex items-center gap-2 font-display text-[0.98rem] font-bold text-navy-900">
                    <Icon className="h-5 w-5 text-clay-600" />
                    {option.label}
                  </span>
                  <span className="mt-1 block text-[0.85rem] text-ash-700">
                    {option.body}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Contact information */}
      <fieldset className="mt-8">
        <legend className="mb-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
          Contact Information
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id={`${ID}-firstName`}
            name="firstName"
            label="First Name"
            autoComplete="given-name"
            required
            value={values.firstName}
            onChange={(event) => setField("firstName", event.target.value)}
            onBlur={() => handleBlur("firstName")}
            error={errors.firstName}
          />
          <TextField
            id={`${ID}-lastName`}
            name="lastName"
            label="Last Name"
            autoComplete="family-name"
            required
            value={values.lastName}
            onChange={(event) => setField("lastName", event.target.value)}
            onBlur={() => handleBlur("lastName")}
            error={errors.lastName}
          />
          <TextField
            id={`${ID}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            label={inPerson ? "Phone Number" : "Preferred Phone Number"}
            hint={inPerson ? undefined : "The number we should call"}
            placeholder="(209) 000-0000"
            required
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            onBlur={() => handleBlur("phone")}
            error={errors.phone}
          />
          <TextField
            id={`${ID}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            label="Email Address"
            placeholder="name@example.com"
            required
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            error={errors.email}
          />
        </div>
      </fieldset>

      {/* Property information */}
      <fieldset className="mt-8">
        <legend className="mb-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
          Property Information
          <span className="ml-2 font-sans text-[0.72rem] font-medium normal-case tracking-normal text-ash-600">
            {inPerson
              ? "Required so we know where to meet you"
              : "Helpful, but not required for a phone appointment"}
          </span>
        </legend>
        <div className="grid gap-5 sm:grid-cols-6">
          <TextField
            id={`${ID}-propertyAddress`}
            name="propertyAddress"
            label="Property Address"
            autoComplete="street-address"
            placeholder="123 Main Street"
            required={inPerson}
            containerClassName="sm:col-span-6"
            value={values.propertyAddress}
            onChange={(event) => setField("propertyAddress", event.target.value)}
            onBlur={() => handleBlur("propertyAddress")}
            error={errors.propertyAddress}
          />
          <TextField
            id={`${ID}-city`}
            name="city"
            label="City"
            autoComplete="address-level2"
            placeholder="Stockton"
            required={inPerson}
            containerClassName="sm:col-span-3"
            value={values.city}
            onChange={(event) => setField("city", event.target.value)}
            onBlur={() => handleBlur("city")}
            error={errors.city}
          />
          <TextField
            id={`${ID}-state`}
            name="state"
            label="State"
            autoComplete="address-level1"
            placeholder="CA"
            maxLength={30}
            required={inPerson}
            containerClassName="sm:col-span-1"
            value={values.state}
            onChange={(event) => setField("state", event.target.value)}
            onBlur={() => handleBlur("state")}
            error={errors.state}
          />
          <TextField
            id={`${ID}-zipCode`}
            name="zipCode"
            label="ZIP Code"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="95202"
            maxLength={10}
            required={inPerson}
            containerClassName="sm:col-span-2"
            value={values.zipCode}
            onChange={(event) => setField("zipCode", event.target.value)}
            onBlur={() => handleBlur("zipCode")}
            error={errors.zipCode}
          />
        </div>
      </fieldset>

      {/* Service + preferences */}
      <fieldset className="mt-8">
        <legend className="mb-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
          Service &amp; Appointment Preferences
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id={`${ID}-service`}
            name="service"
            label="Service Needed"
            options={appointmentServiceOptions}
            placeholder="Choose a service"
            required
            containerClassName="sm:col-span-2"
            value={values.service}
            onChange={(event) => setField("service", event.target.value)}
            onBlur={() => handleBlur("service")}
            error={errors.service}
          />
          <TextField
            id={`${ID}-preferredDate`}
            name="preferredDate"
            type="date"
            label="Preferred Date"
            min={minDate}
            required
            value={values.preferredDate}
            onChange={(event) => setField("preferredDate", event.target.value)}
            onBlur={() => handleBlur("preferredDate")}
            error={errors.preferredDate}
          />
          <SelectField
            id={`${ID}-preferredTime`}
            name="preferredTime"
            label="Preferred Time"
            options={TIME_OPTIONS}
            placeholder="Choose a time window"
            required
            value={values.preferredTime}
            onChange={(event) => setField("preferredTime", event.target.value)}
            onBlur={() => handleBlur("preferredTime")}
            error={errors.preferredTime}
          />
          <TextareaField
            id={`${ID}-notes`}
            name="notes"
            label="Additional Notes"
            placeholder="Briefly describe what your property needs."
            containerClassName="sm:col-span-2"
            value={values.notes}
            onChange={(event) => setField("notes", event.target.value)}
            error={errors.notes}
          />
        </div>
      </fieldset>

      {/* Consent */}
      <div className="mt-7">
        <label
          htmlFor={`${ID}-consent`}
          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-[0.9rem] leading-relaxed ${
            errors.consent ? "border-red-600 bg-red-50/40" : "border-navy-900/15 bg-sand-50"
          }`}
        >
          <input
            type="checkbox"
            id={`${ID}-consent`}
            name="consent"
            checked={values.consent}
            onChange={(event) => setField("consent", event.target.checked)}
            onBlur={() => handleBlur("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${ID}-consent-error` : undefined}
            aria-required="true"
            className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-[#9c571f]"
          />
          <span className="text-ash-700">
            I agree to be contacted by Reyes Valley Property Management &amp;
            Maintenance about this request by phone, text, or email.{" "}
            <span className="text-clay-600" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.consent ? (
          <p
            id={`${ID}-consent-error`}
            className="mt-1.5 text-[0.82rem] font-medium text-red-700"
          >
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={btn("accent", "lg", "w-full sm:w-auto sm:min-w-[232px]")}
        >
          {status === "submitting" ? (
            <>
              <SpinnerIcon className="h-[18px] w-[18px] animate-spin" />
              Sending Request…
            </>
          ) : (
            "Request Appointment"
          )}
        </button>
        <p className="text-[0.85rem] leading-relaxed text-ash-600">
          Prefer to talk now?{" "}
          <a
            href={telHref}
            className="font-semibold text-clay-700 underline underline-offset-4 hover:text-clay-600"
          >
            Call {siteConfig.phone.display}
          </a>
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "submitting" ? "Submitting your appointment request." : ""}
      </p>
    </form>
  );
}
