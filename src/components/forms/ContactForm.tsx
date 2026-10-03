"use client";

import { useCallback, useRef, useState } from "react";
import { CheckCircleIcon, PhoneIcon, SpinnerIcon } from "@/components/Icons";
import {
  ErrorSummary,
  SelectField,
  TextField,
  TextareaField,
} from "@/components/forms/Fields";
import { btn } from "@/components/ui/buttonStyles";
import { contactServiceOptions } from "@/lib/services";
import { siteConfig, telHref } from "@/lib/site";
import {
  emptyContact,
  hasErrors,
  validateContact,
  type ContactInput,
  type FieldErrors,
} from "@/lib/validation";

const ID = "msg";
type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ ...emptyContact });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string>("");
  const [delivered, setDelivered] = useState<boolean>(false);
  const confirmationRef = useRef<HTMLDivElement | null>(null);

  const setField = useCallback(
    <K extends keyof ContactInput>(key: K, value: ContactInput[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key as string]) return prev;
        const updated = { ...prev };
        delete updated[key as string];
        return updated;
      });
    },
    [],
  );

  const valuesRef = useRef(values);
  valuesRef.current = values;

  const handleBlur = useCallback((key: keyof ContactInput) => {
    const fresh = validateContact(valuesRef.current);
    setErrors((prev) => {
      const updated = { ...prev };
      if (fresh[key as string]) updated[key as string] = fresh[key as string];
      else delete updated[key as string];
      return updated;
    });
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setServerMessage(null);

    if (hasErrors(found)) {
      setStatus("idle");
      const firstKey = Object.keys(found)[0];
      const node = document.getElementById(`${ID}-${firstKey}`);
      node?.focus();
      node?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(siteConfig.endpoints.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "website-contact-form" }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        errors?: FieldErrors;
        message?: string;
        reference?: string;
        notification?: { delivered: boolean };
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setServerMessage(
          data.message ?? "We could not send your request. Please try again.",
        );
        setStatus("error");
        return;
      }

      setReference(data.reference ?? "");
      setDelivered(Boolean(data.notification?.delivered));
      setStatus("success");
      window.setTimeout(() => confirmationRef.current?.focus(), 60);
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
        ref={confirmationRef}
        tabIndex={-1}
        className="rounded-2xl border border-navy-900/10 bg-white p-7 shadow-[var(--shadow-card)] sm:p-9"
      >
        <span className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-clay-50 p-3 text-clay-600">
          <CheckCircleIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-navy-900">
          Request Received
        </h3>
        <p className="mt-3 text-[1.0rem] leading-relaxed text-ash-700">
          Thank you for contacting Reyes Valley Property Management &amp; Maintenance.
          We&rsquo;ve received your request and will follow up using the contact
          information you provided.
        </p>
        {reference ? (
          <p className="mt-4 inline-block rounded-md bg-sand-100 px-3 py-1.5 text-sm font-semibold text-navy-900">
            Reference: {reference}
          </p>
        ) : null}
        {!delivered ? (
          <p className="mt-5 rounded-lg border border-navy-900/10 bg-sand-50 px-4 py-3 text-xs leading-relaxed text-ash-600">
            <span className="font-semibold text-navy-900">Site setup note:</span> this
            request is stored in the website database. Email forwarding has not been
            connected yet, so no notification email was sent.
          </p>
        ) : null}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={telHref} className={btn("accent", "md")}>
            <PhoneIcon className="h-[18px] w-[18px]" />
            Call Now · {siteConfig.phone.display}
          </a>
          <button
            type="button"
            onClick={() => {
              setValues({ ...emptyContact });
              setErrors({});
              setReference("");
              setStatus("idle");
            }}
            className={btn("outline", "md")}
          >
            Send Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="contact-form-heading"
      className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <h3 id="contact-form-heading" className="font-display text-xl font-bold text-navy-900">
        Send a Property Service Inquiry
      </h3>
      <p className="mt-2 text-sm text-ash-700">
        Fields marked with <span className="text-clay-600">*</span> are required.
      </p>

      <div className="mt-6">
        {status === "error" || hasErrors(errors) ? (
          <ErrorSummary errors={errors} idPrefix={ID} message={serverMessage ?? undefined} />
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id={`${ID}-fullName`}
            name="fullName"
            label="Full Name"
            autoComplete="name"
            required
            containerClassName="sm:col-span-2"
            value={values.fullName}
            onChange={(event) => setField("fullName", event.target.value)}
            onBlur={() => handleBlur("fullName")}
            error={errors.fullName}
          />
          <TextField
            id={`${ID}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            label="Phone"
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
            label="Email"
            placeholder="name@example.com"
            required
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            error={errors.email}
          />
          <TextField
            id={`${ID}-propertyAddress`}
            name="propertyAddress"
            label="Property Address"
            autoComplete="street-address"
            placeholder="123 Main Street, Stockton, CA"
            containerClassName="sm:col-span-2"
            value={values.propertyAddress}
            onChange={(event) => setField("propertyAddress", event.target.value)}
            error={errors.propertyAddress}
          />
          <SelectField
            id={`${ID}-service`}
            name="service"
            label="Service Needed"
            options={contactServiceOptions}
            placeholder="Choose a service"
            required
            containerClassName="sm:col-span-2"
            value={values.service}
            onChange={(event) => setField("service", event.target.value)}
            onBlur={() => handleBlur("service")}
            error={errors.service}
          />
          <TextareaField
            id={`${ID}-message`}
            name="message"
            label="Message"
            required
            rows={5}
            placeholder="Tell us about your property and what you need help with."
            containerClassName="sm:col-span-2"
            value={values.message}
            onChange={(event) => setField("message", event.target.value)}
            onBlur={() => handleBlur("message")}
            error={errors.message}
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className={btn("accent", "lg", "mt-7 w-full sm:w-auto sm:min-w-[200px]")}
        >
          {status === "submitting" ? (
            <>
              <SpinnerIcon className="h-[18px] w-[18px] animate-spin" />
              Sending…
            </>
          ) : (
            "Send Request"
          )}
        </button>

        <p aria-live="polite" className="sr-only">
          {status === "submitting" ? "Sending your request." : ""}
        </p>
      </div>
    </form>
  );
}
