import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { siteConfig, telHref } from "@/lib/site";

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-white scroll-mt-28">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-clay-600">
                <span aria-hidden="true" className="h-px w-8 bg-clay-500/50" />
                Contact
              </p>
              <h2
                id="contact-heading"
                className="mt-4 text-pretty font-display text-3xl font-extrabold leading-[1.12] text-navy-900 sm:text-4xl lg:text-[2.6rem]"
              >
                Let&rsquo;s Talk About Your Property
              </h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-ash-700">
                Tell us a little about your property and what you need help with.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-9 space-y-4">
                <li>
                  <a
                    href={telHref}
                    className="group flex items-start gap-4 rounded-xl border border-navy-900/10 bg-sand-50 p-5 transition-colors hover:border-clay-300 hover:bg-clay-50"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-clay-600 shadow-[var(--shadow-card)]">
                      <PhoneIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
                        Phone
                      </span>
                      <span className="font-display text-lg font-bold text-navy-900">
                        {siteConfig.phone.display}
                      </span>
                      <span className="mt-0.5 block text-sm text-ash-700">
                        Tap to call from your phone
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email.address}`}
                    className="group flex items-start gap-4 rounded-xl border border-navy-900/10 bg-sand-50 p-5 transition-colors hover:border-clay-300 hover:bg-clay-50"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-clay-600 shadow-[var(--shadow-card)]">
                      <MailIcon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
                        Email
                      </span>
                      <span className="break-all font-medium text-navy-900">
                        {siteConfig.email.address}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 rounded-xl border border-navy-900/10 bg-sand-50 p-5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-clay-600 shadow-[var(--shadow-card)]">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[0.72rem] font-semibold uppercase tracking-wider text-ash-600">
                      Service Area
                    </span>
                    <span className="font-medium text-navy-900">
                      San Joaquin Valley, California
                    </span>
                    <span className="mt-0.5 block text-sm text-ash-700">
                      Special emphasis on Stockton, California
                    </span>
                  </span>
                </li>
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-ash-600">
                Phone number and email address shown above are placeholders pending the
                business owner&rsquo;s confirmed details.
              </p>
            </Reveal>
          </div>

          <Reveal delay={60} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
