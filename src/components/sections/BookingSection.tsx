import { CheckIcon, ClockIcon, PhoneIcon, ShieldIcon } from "@/components/Icons";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Reveal from "@/components/ui/Reveal";
import { siteConfig, telHref } from "@/lib/site";

const ASSURANCES = [
  {
    icon: ClockIcon,
    title: "Pick a time that works",
    body: "Share your preferred day and time window and we'll work from there.",
  },
  {
    icon: ShieldIcon,
    title: "Your details stay with us",
    body: "Information you submit is used only to follow up about your property request.",
  },
  {
    icon: CheckIcon,
    title: "No obligation",
    body: "An appointment is simply a conversation about what your property needs.",
  },
];

export default function BookingSection() {
  return (
    <section
      id="book"
      aria-labelledby="booking-heading"
      className="relative isolate overflow-hidden bg-sand-100 scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-clay-600">
                <span aria-hidden="true" className="h-px w-8 bg-clay-500/50" />
                Book an Appointment
              </p>
              <h2
                id="booking-heading"
                className="mt-4 text-pretty font-display text-3xl font-extrabold leading-[1.12] text-navy-900 sm:text-4xl"
              >
                Request a Phone or In-Person Appointment
              </h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-ash-700">
                Fill out the form and the Reyes Valley team will follow up to confirm
                the details. Choose a phone appointment for a quick conversation, or an
                in-person appointment to review the property together.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <ul className="mt-8 space-y-5">
                {ASSURANCES.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-3.5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-clay-600 shadow-[var(--shadow-card)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-[0.98rem] font-bold text-navy-900">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-[0.9rem] leading-relaxed text-ash-700">
                        {body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-navy-900/10 bg-white p-5">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ash-600">
                  Prefer to call?
                </p>
                <a
                  href={telHref}
                  className="mt-2 flex items-center gap-2.5 font-display text-xl font-extrabold text-navy-900 transition-colors hover:text-clay-700"
                >
                  <PhoneIcon className="h-5 w-5 text-clay-600" />
                  {siteConfig.phone.display}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={60} className="lg:col-span-8">
            <AppointmentForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
