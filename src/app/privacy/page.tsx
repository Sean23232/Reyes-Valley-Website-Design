import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Placeholder privacy policy for Reyes Valley Property Management & Maintenance describing how website form submissions are handled.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
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
            <li className="text-navy-900">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="mt-6 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="mt-5 rounded-lg border border-clay-100 bg-clay-50 px-5 py-4 text-sm leading-relaxed text-navy-900">
          <strong>Placeholder document.</strong> This page is a starting point for
          Reyes Valley Property Management &amp; Maintenance and should be reviewed and
          finalized by the business owner before launch.
        </p>

        <div className="mt-8 space-y-7 text-[1.0rem] leading-relaxed text-ash-700">
          <section>
            <h2 className="font-display text-xl font-bold text-navy-900">
              Information we collect
            </h2>
            <p className="mt-3">
              When you submit the appointment form or the contact form on this website,
              we collect the information you choose to provide — such as your name,
              phone number, email address, property address, the service you selected,
              and any notes or messages you include.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy-900">
              How the information is used
            </h2>
            <p className="mt-3">
              Submitted information is used to respond to your request, schedule
              appointments, and discuss property-care services. It is not sold.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy-900">
              Where the information is stored
            </h2>
            <p className="mt-3">
              Form submissions are stored in the website&rsquo;s database so the Reyes
              Valley team can review and follow up on each request. If an email or
              messaging service is connected in the future, submissions may also be
              forwarded to that service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-navy-900">Questions</h2>
            <p className="mt-3">
              Questions about this policy can be directed to{" "}
              <a
                href={`mailto:${siteConfig.email.address}`}
                className="font-semibold text-clay-700 underline underline-offset-4"
              >
                {siteConfig.email.address}
              </a>{" "}
              or {siteConfig.phone.display}. (Contact details are placeholders pending
              confirmation.)
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
