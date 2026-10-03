import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Placeholder terms of use for the Reyes Valley Property Management & Maintenance website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-ash-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy-900">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-navy-900">Terms of Use</li>
          </ol>
        </nav>

        <h1 className="mt-6 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
          Terms of Use
        </h1>

        <p className="mt-5 rounded-lg border border-clay-100 bg-clay-50 px-5 py-4 text-sm leading-relaxed text-navy-900">
          <strong>Placeholder document.</strong> These terms are a starting point and
          should be reviewed and finalized by the business owner before launch.
        </p>

        <div className="mt-8 space-y-7 text-[1.0rem] leading-relaxed text-ash-700">
          <section>
            <h2 className="font-display text-xl font-bold text-navy-900">
              Website content
            </h2>
            <p className="mt-3">
              Information on this website describes the types of property-care services
              Reyes Valley Property Management &amp; Maintenance can discuss with
              customers. Service details, availability, and scope are confirmed
              directly with the business.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy-900">
              Appointment requests
            </h2>
            <p className="mt-3">
              Submitting the appointment form is a request, not a confirmed booking. The
              Reyes Valley team will follow up using the contact information provided to
              confirm details.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy-900">Contact</h2>
            <p className="mt-3">
              Questions about these terms can be directed to{" "}
              <a
                href={`mailto:${siteConfig.email.address}`}
                className="font-semibold text-clay-700 underline underline-offset-4"
              >
                {siteConfig.email.address}
              </a>
              . (Contact details are placeholders pending confirmation.)
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-clay-700 underline underline-offset-4"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
