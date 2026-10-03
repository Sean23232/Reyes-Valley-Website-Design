import Link from "next/link";
import { PhoneIcon } from "@/components/Icons";
import { btn } from "@/components/ui/buttonStyles";
import { siteConfig, telHref } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="bg-sand-100">
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-6 lg:py-32">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-clay-600">
          Page Not Found
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-ash-700">
          The page you were looking for may have moved. You can head back to the
          homepage, book an appointment, or call us directly about your property.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={btn("navy", "lg")}>
            Back to Home
          </Link>
          <Link href="/book" className={btn("accent", "lg")}>
            Book an Appointment
          </Link>
          <a href={telHref} className={btn("outline", "lg")}>
            <PhoneIcon className="h-[18px] w-[18px]" />
            Call {siteConfig.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
