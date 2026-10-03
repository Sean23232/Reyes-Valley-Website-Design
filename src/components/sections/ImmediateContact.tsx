import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";
import { BookAppointmentButton, CallNowButton } from "@/components/ui/ActionButtons";
import Reveal from "@/components/ui/Reveal";
import { siteConfig, telHref } from "@/lib/site";

export default function ImmediateContact() {
  return (
    <section aria-labelledby="immediate-heading" className="bg-sand-100">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-[var(--shadow-card)]">
          <div className="grid lg:grid-cols-5">
            <Reveal className="p-7 sm:p-10 lg:col-span-3">
              <h2
                id="immediate-heading"
                className="text-balance font-display text-3xl font-extrabold leading-[1.14] text-navy-900 sm:text-[2.3rem]"
              >
                Need to Talk About Your Property?
              </h2>
              <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ash-700">
                Have a property question, maintenance need, or project in mind? Get in
                touch with Reyes Valley Property Management &amp; Maintenance.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CallNowButton variant="accent" size="lg" showNumber />
                <BookAppointmentButton variant="outline" size="lg" />
              </div>
            </Reveal>

            <Reveal delay={90} className="bg-sand-50 p-7 sm:p-10 lg:col-span-2">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ash-600">
                Contact Information
              </h3>
              <ul className="mt-6 space-y-5">
                <li>
                  <a href={telHref} className="group flex items-start gap-3.5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clay-50 text-clay-600">
                      <PhoneIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
                        Phone
                      </span>
                      <span className="font-display text-lg font-bold text-navy-900 group-hover:text-clay-700">
                        {siteConfig.phone.display}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email.address}`}
                    className="group flex items-start gap-3.5"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clay-50 text-clay-600">
                      <MailIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
                        Email
                      </span>
                      <span className="break-all font-medium text-navy-900 group-hover:text-clay-700">
                        {siteConfig.email.address}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clay-50 text-clay-600">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
                      Service Area
                    </span>
                    <span className="font-medium text-navy-900">
                      San Joaquin Valley, California
                    </span>
                  </span>
                </li>
              </ul>
              <p className="mt-6 border-t border-navy-900/10 pt-4 text-xs leading-relaxed text-ash-600">
                Phone and email shown are placeholders and will be replaced with the
                business owner&rsquo;s confirmed contact details.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
