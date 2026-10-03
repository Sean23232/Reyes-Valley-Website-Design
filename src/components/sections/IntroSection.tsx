"use client";

import { ArrowRightIcon, BuildingIcon, HomeIcon, WrenchIcon } from "@/components/Icons";
import Reveal from "@/components/ui/Reveal";
import { btn } from "@/components/ui/buttonStyles";
import { scrollToId } from "@/lib/booking-bus";

const HIGHLIGHTS = [
  { icon: HomeIcon, label: "Residential properties" },
  { icon: BuildingIcon, label: "Commercial properties" },
  { icon: WrenchIcon, label: "Ongoing & one-time work" },
];

export default function IntroSection() {
  return (
    <section id="about" aria-labelledby="intro-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/images/intro-entrance.jpg"
                alt="Clean, welcoming front entrance of a well-cared-for home"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-3 hidden rounded-xl border border-navy-900/10 bg-sand-50 px-6 py-5 shadow-[var(--shadow-card)] sm:block lg:-right-6"
            >
              <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-clay-600">
                One Company
              </p>
              <p className="mt-1 max-w-[14rem] text-sm text-ash-700">
                Six property-care services, one point of contact.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-clay-600">
                <span aria-hidden="true" className="h-px w-8 bg-clay-500/50" />
                Property Care You Can Count On
              </p>
              <h2
                id="intro-heading"
                className="mt-4 text-pretty font-display text-3xl font-extrabold leading-[1.12] text-navy-900 sm:text-4xl lg:text-[2.6rem]"
              >
                One Place for Your Property&rsquo;s Needs
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 text-[1.02rem] leading-relaxed text-ash-700">
                Managing and maintaining a property can require attention to many
                different details. Reyes Valley Property Management &amp; Maintenance
                is designed to make that process easier by providing a convenient
                point of contact for a wide range of property needs.
              </p>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-ash-700">
                Whether you need property management, maintenance, perimeter care,
                interior upkeep, or modifications to your property, our goal is to
                provide a straightforward way to get the support you need.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-lg border border-navy-900/10 bg-sand-50 px-4 py-3 text-sm font-medium text-navy-900"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-clay-600" />
                    {label}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => scrollToId("services")}
                className={btn("navy", "md", "mt-8 group")}
              >
                Explore Our Services
                <ArrowRightIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
