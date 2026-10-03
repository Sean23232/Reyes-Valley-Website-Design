"use client";

import { PhoneIcon, CalendarIcon } from "@/components/Icons";
import { btn, type ButtonSize, type ButtonVariant } from "@/components/ui/buttonStyles";
import { requestBooking, type BookingIntent } from "@/lib/booking-bus";
import { siteConfig, telHref } from "@/lib/site";

type BookProps = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  intent?: BookingIntent;
  withIcon?: boolean;
};

export function BookAppointmentButton({
  label = "Book an Appointment",
  variant = "accent",
  size = "md",
  className = "",
  intent,
  withIcon = true,
}: BookProps) {
  return (
    <button
      type="button"
      onClick={() => requestBooking(intent ?? {})}
      className={btn(variant, size, className)}
    >
      {withIcon ? <CalendarIcon className="h-[18px] w-[18px]" /> : null}
      {label}
    </button>
  );
}

type CallProps = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  withIcon?: boolean;
  showNumber?: boolean;
};

export function CallNowButton({
  label = "Call Now",
  variant = "outline",
  size = "md",
  className = "",
  withIcon = true,
  showNumber = false,
}: CallProps) {
  return (
    <a
      href={telHref}
      className={btn(variant, size, className)}
      aria-label={`Call Reyes Valley Property Management and Maintenance at ${siteConfig.phone.display}`}
    >
      {withIcon ? <PhoneIcon className="h-[18px] w-[18px]" /> : null}
      {showNumber ? `${label} · ${siteConfig.phone.display}` : label}
    </a>
  );
}
