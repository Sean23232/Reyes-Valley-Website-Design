import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon, PhoneIcon } from "@/components/Icons";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { appointmentServiceOptions } from "@/lib/services";
import { siteConfig, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request a phone or in-person appointment with Reyes Valley Property Management & Maintenance for property management, maintenance, interior upkeep, perimeter maintenance, or property modifications in Stockton and the San Joaquin Valley.",
  alternates: { canonical: "/book" },
};

type SearchParams = Promise<{ type?: string; service?: string }>;

export default async function BookPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const initialType = params.type === "in-person" ? "in-person" : "phone";
  const requested = params.service ?? "";
  const initialService = (appointmentServiceOptions as readonly string[]).includes(
    requested,
  )
    ? requested
    : "";

  return (
    <div className="bg-sand-100">
      <div className="on-dark bg-navy-900">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-sand-200/70">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Book an Appointment</li>
            </ol>
          </nav>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-[2.9rem]">
            Book a Phone or In-Person Appointment
          </h1>
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-sand-200/85">
            Share a few details about your property and how you&rsquo;d like to connect.
            The Reyes Valley team will follow up to confirm your appointment.
          </p>
          <ul className="mt-7 grid gap-2.5 text-sm text-sand-100/85 sm:grid-cols-3">
            {[
              "Phone or in-person options",
              "Serving the San Joaquin Valley",
              "One point of contact for every service",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:py-18">
        <AppointmentForm initialType={initialType} initialService={initialService} />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-navy-900/10 bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold text-navy-900">
              Need to reach us right away?
            </p>
            <p className="mt-1 text-sm text-ash-700">
              Call Reyes Valley Property Management &amp; Maintenance directly.
            </p>
          </div>
          <a
            href={telHref}
            className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-lg bg-clay-600 px-6 font-semibold text-white transition-colors hover:bg-clay-700"
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
            Call Now · {siteConfig.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
