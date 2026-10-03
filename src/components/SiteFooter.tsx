import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";
import { BookAppointmentButton, CallNowButton } from "@/components/ui/ActionButtons";
import { services } from "@/lib/services";
import { navLinks, siteConfig, telHref } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="on-dark bg-navy-950 text-sand-100">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-6 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <BrandMark className="h-11 w-11" tone="light" />
              <span className="font-display text-lg font-extrabold leading-tight text-white">
                Reyes Valley
                <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-sand-300">
                  Property Management &amp; Maintenance
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-200/80">
              Property management and maintenance services throughout the San Joaquin
              Valley, with special emphasis on Stockton, California.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <BookAppointmentButton variant="accent" size="sm" />
              <CallNowButton variant="outlineLight" size="sm" />
            </div>
          </div>

          {/* Column 2 — Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2
              id="footer-services"
              className="font-display text-xs font-bold uppercase tracking-[0.18em] text-clay-300"
            >
              Services
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sand-200/85 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Quick links */}
          <nav aria-labelledby="footer-links" className="lg:col-span-2">
            <h2
              id="footer-links"
              className="font-display text-xs font-bold uppercase tracking-[0.18em] text-clay-300"
            >
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sand-200/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book"
                  className="text-sand-200/85 transition-colors hover:text-white"
                >
                  Book an Appointment
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4 — Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-clay-300">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={telHref} className="group flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
                  <span>
                    <span className="block text-[0.72rem] uppercase tracking-wider text-sand-300/70">
                      Phone
                    </span>
                    <span className="font-medium text-white group-hover:text-clay-300">
                      {siteConfig.phone.display}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email.address}`}
                  className="group flex items-start gap-3"
                >
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
                  <span>
                    <span className="block text-[0.72rem] uppercase tracking-wider text-sand-300/70">
                      Email
                    </span>
                    <span className="font-medium break-all text-white group-hover:text-clay-300">
                      {siteConfig.email.address}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
                <span>
                  <span className="block text-[0.72rem] uppercase tracking-wider text-sand-300/70">
                    Service Area
                  </span>
                  <span className="font-medium text-white">Stockton, California</span>
                  <span className="block text-sand-200/80">San Joaquin Valley</span>
                </span>
              </li>
            </ul>
            <p className="mt-5 text-[0.7rem] leading-relaxed text-sand-300/60">
              Phone number and email address are placeholders pending confirmation from
              the business owner.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-sand-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Reyes Valley Property Management &amp; Maintenance. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
