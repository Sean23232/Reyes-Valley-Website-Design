"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/Icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const FAQS = [
  {
    id: "areas",
    question: "What areas do you serve?",
    answer:
      "Reyes Valley Property Management & Maintenance serves the San Joaquin Valley, with special emphasis on Stockton, California.",
  },
  {
    id: "types",
    question: "What types of property services do you provide?",
    answer:
      "Services include property management, property maintenance, perimeter maintenance, interior upkeep, property modifications, and customized property-care support.",
  },
  {
    id: "phone-appointment",
    question: "Can I schedule a phone appointment?",
    answer:
      "Yes. Visitors can request a phone appointment through the appointment form.",
  },
  {
    id: "in-person",
    question: "Can I request an in-person appointment?",
    answer:
      "Yes. Visitors can select an in-person appointment and provide the property address and preferred appointment information.",
  },
  {
    id: "immediate",
    question: "What if I need to contact you immediately?",
    answer: "Use the Call Now option to contact the business directly.",
  },
  {
    id: "unsure",
    question: "I'm not sure which service I need. What should I do?",
    answer:
      "Choose Customized Property Care or Not Sure / Other when submitting your request and describe what you need in the message field.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  return (
    <section aria-labelledby="faq-heading" className="bg-sand-100">
      <div className="mx-auto max-w-4xl px-5 py-18 sm:px-6 lg:py-24">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          headingId="faq-heading"
          title="Questions, Answered"
          intro={
            <p>
              A few things property owners commonly ask before reaching out. Have a
              different question? Send it through the contact form below.
            </p>
          }
        />

        <Reveal className="mt-12 divide-y divide-navy-900/10 overflow-hidden rounded-xl border border-navy-900/10 bg-white">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id}>
                <h3>
                  <button
                    type="button"
                    id={`faq-trigger-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-sand-50 sm:px-7"
                  >
                    <span className="font-display text-[1.05rem] font-bold text-navy-900">
                      {faq.question}
                    </span>
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-clay-600 bg-clay-600 text-white"
                          : "border-navy-900/15 text-navy-900"
                      }`}
                    >
                      <ChevronDownIcon className="h-4.5 w-4.5" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${faq.id}`}
                  hidden={!isOpen}
                  className="accordion-panel"
                >
                  <p className="px-5 pb-6 pr-12 text-[0.98rem] leading-relaxed text-ash-700 sm:px-7">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
