/**
 * Service catalogue. Titles, descriptions and detail copy are intentionally
 * kept in one editable file so the business owner can refine wording without
 * touching component code.
 */

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** Short card description. */
  description: string;
  /** Label used on the service card CTA. */
  ctaLabel: string;
  /** Longer explanation shown in the service detail view. */
  detail: string;
  /** Bullet list: "What this service can help with". */
  helpsWith: string[];
  image: string;
  imageAlt: string;
  /** Matching option value in the appointment / contact service dropdowns. */
  formValue: string;
};

export const services: Service[] = [
  {
    slug: "property-management",
    number: "01",
    title: "Property Management",
    description:
      "Professional property management support designed to help property owners stay organized, informed, and confident in the care of their properties.",
    ctaLabel: "Learn More",
    detail:
      "Property management with Reyes Valley is built around clear communication and consistent follow-through. We work with property owners to keep track of what a property needs, coordinate the right work, and keep the owner informed along the way.",
    helpsWith: [
      "Day-to-day coordination of property needs",
      "Keeping owners informed about the condition of a property",
      "Organizing recurring upkeep and scheduled visits",
      "Acting as a single point of contact for property requests",
    ],
    image: "/images/service-management.jpg",
    imageAlt:
      "Contemporary residential buildings at sunset representing managed properties",
    formValue: "Property Management",
  },
  {
    slug: "property-maintenance",
    number: "02",
    title: "Property Maintenance",
    description:
      "Reliable maintenance support to help keep your property functional, presentable, and properly cared for.",
    ctaLabel: "Learn More",
    detail:
      "Maintenance needs rarely arrive at a convenient time. Reyes Valley provides a straightforward way to request maintenance support so small issues can be addressed before they grow into larger ones.",
    helpsWith: [
      "General repair and upkeep requests",
      "Routine maintenance between tenants or seasons",
      "Keeping a property functional and presentable",
      "Walk-throughs to identify what a property needs next",
    ],
    image: "/images/service-maintenance.jpg",
    imageAlt: "Maintenance professional installing a light fixture indoors",
    formValue: "Property Maintenance",
  },
  {
    slug: "perimeter-maintenance",
    number: "03",
    title: "Perimeter Maintenance",
    description:
      "Care for the areas surrounding your property, helping maintain a clean, orderly, and well-kept exterior environment.",
    ctaLabel: "Learn More",
    detail:
      "The outside of a property is the first thing anyone sees. Perimeter maintenance focuses on the grounds, borders, and outdoor areas that surround a building so the property stays clean, orderly, and well-kept.",
    helpsWith: [
      "Grounds and outdoor area upkeep",
      "Clearing and tidying exterior spaces",
      "Fence lines, walkways, and property borders",
      "Keeping the exterior presentable year round",
    ],
    image: "/images/service-perimeter.jpg",
    imageAlt:
      "Well-kept yard and fence line surrounding a residential property",
    formValue: "Perimeter Maintenance",
  },
  {
    slug: "interior-upkeep",
    number: "04",
    title: "Interior Upkeep",
    description:
      "Interior upkeep services designed to help maintain clean, functional, comfortable, and presentable spaces.",
    ctaLabel: "Learn More",
    detail:
      "Interior upkeep covers the inside of a property — the spaces people live and work in every day. The goal is simple: keep interiors clean, comfortable, functional, and ready for whoever uses them next.",
    helpsWith: [
      "Preparing interiors between occupants",
      "Keeping shared and common areas presentable",
      "Addressing wear and tear inside the property",
      "Ongoing interior condition checks",
    ],
    image: "/images/service-interior.jpg",
    imageAlt: "Bright, clean interior living space with hardwood floors",
    formValue: "Interior Upkeep",
  },
  {
    slug: "property-modifications",
    number: "05",
    title: "Property Modifications",
    description:
      "Support for property changes, updates, improvements, and modifications based on your property's specific needs.",
    ctaLabel: "Learn More",
    detail:
      "Properties change over time, and so do the people who use them. Reyes Valley helps owners work through updates and modifications — starting with a conversation about what you want to change and what the property allows.",
    helpsWith: [
      "Updates and improvements to existing spaces",
      "Changes requested by owners or occupants",
      "Planning the right approach before work begins",
      "Coordinating the steps involved in a modification",
    ],
    image: "/images/service-modifications.jpg",
    imageAlt: "Painter on a ladder updating an interior wall during a property modification",
    formValue: "Property Modification",
  },
  {
    slug: "customized-property-care",
    number: "06",
    title: "Customized Property Care",
    description:
      "Need something that doesn't fit into one category? Tell us what your property needs and we'll help determine the right next step.",
    ctaLabel: "Request Assistance",
    detail:
      "Not every request fits neatly into a category — and that is completely normal. Describe the situation in your own words and the Reyes Valley team will help you figure out the appropriate next step for your property.",
    helpsWith: [
      "Requests that span more than one service",
      "Situations you are not sure how to categorize",
      "One-off projects and special requests",
      "Getting a clear recommendation on what to do next",
    ],
    image: "/images/service-custom.jpg",
    imageAlt: "Gloved hand holding an adjustable wrench against a dark background",
    formValue: "Customized Property Care",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Options used by the appointment booking form. */
export const appointmentServiceOptions = [
  "Property Management",
  "Property Maintenance",
  "Perimeter Maintenance",
  "Interior Upkeep",
  "Property Modification",
  "Customized Property Care",
  "Not Sure / Other",
] as const;

/** Options used by the general contact form. */
export const contactServiceOptions = [
  "Property Management",
  "Maintenance",
  "Perimeter Maintenance",
  "Interior Upkeep",
  "Property Modification",
  "Other",
] as const;
