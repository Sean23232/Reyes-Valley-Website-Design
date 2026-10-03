"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import BrandMark from "@/components/BrandMark";
import { CloseIcon, MailIcon, MapPinIcon, MenuIcon, PhoneIcon } from "@/components/Icons";
import { btn } from "@/components/ui/buttonStyles";
import { requestBooking, scrollToId } from "@/lib/booking-bus";
import { navLinks, siteConfig, telHref } from "@/lib/site";

const SECTION_IDS = ["home", "services", "about", "how-it-works", "service-area", "contact"];

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — highlights the current section in the desktop navigation.
  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === "undefined") return;
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Close the mobile menu on Escape and lock background scrolling.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const id = href.startsWith("/#") ? href.slice(2) : null;
      if (!id || !isHome) return;
      if (scrollToId(id)) {
        event.preventDefault();
        window.history.replaceState(null, "", `#${id}`);
        setActiveId(id);
        setMenuOpen(false);
      }
    },
    [isHome],
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="on-dark hidden bg-navy-950 text-sand-100 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-[0.78rem]">
          <p className="flex items-center gap-2 text-sand-200/85">
            <MapPinIcon className="h-4 w-4 text-clay-300" />
            Serving property owners throughout the San Joaquin Valley · Stockton, California
          </p>
          <div className="flex items-center gap-6">
            <a
              href={telHref}
              className="flex items-center gap-2 font-medium text-white transition-colors hover:text-clay-300"
            >
              <PhoneIcon className="h-4 w-4 text-clay-300" />
              {siteConfig.phone.display}
            </a>
            <a
              href={`mailto:${siteConfig.email.address}`}
              className="flex items-center gap-2 font-medium text-white transition-colors hover:text-clay-300"
            >
              <MailIcon className="h-4 w-4 text-clay-300" />
              {siteConfig.email.address}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`border-b bg-sand-50/95 backdrop-blur transition-shadow duration-300 ${
          scrolled
            ? "border-navy-900/10 shadow-[0_8px_30px_-22px_rgba(10,27,42,0.6)]"
            : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Reyes Valley Property Management and Maintenance — home"
          >
            <BrandMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
            <span className="leading-tight">
              <span className="block font-display text-[0.98rem] font-extrabold tracking-tight text-navy-900 sm:text-[1.08rem]">
                Reyes Valley
              </span>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-ash-600 sm:text-[0.65rem]">
                Property Management &amp; Maintenance
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const id = link.href.replace("/#", "");
                const isActive = isHome && activeId === id;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(event) => handleNavClick(event, link.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative rounded-md px-3 py-2 text-[0.9rem] font-medium transition-colors ${
                        isActive ? "text-navy-900" : "text-ash-700 hover:text-navy-900"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-clay-500 transition-transform duration-300 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telHref}
              className={btn("outline", "sm", "hidden sm:inline-flex")}
              aria-label={`Call Reyes Valley at ${siteConfig.phone.display}`}
            >
              <PhoneIcon className="h-4 w-4" />
              Call Now
            </a>
            <button
              type="button"
              onClick={() => requestBooking()}
              className={btn("accent", "sm", "hidden md:inline-flex")}
            >
              Book an Appointment
            </button>

            <a
              href={telHref}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy-900/15 bg-white text-navy-900 sm:hidden"
              aria-label={`Call Reyes Valley at ${siteConfig.phone.display}`}
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy-900/15 bg-white text-navy-900 xl:hidden"
            >
              {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              <span className="sr-only">
                {menuOpen ? "Close navigation menu" : "Open navigation menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {menuOpen ? (
        <div className="xl:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-navy-950/45"
          />
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-navy-900/10 bg-sand-50 px-5 pb-8 pt-4 shadow-xl"
          >
            <nav aria-label="Mobile">
              <ul className="divide-y divide-navy-900/10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(event) => {
                        handleNavClick(event, link.href);
                        setMenuOpen(false);
                      }}
                      className="flex items-center justify-between py-3.5 font-display text-lg font-semibold text-navy-900"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-clay-500">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  requestBooking();
                }}
                className={btn("accent", "lg", "w-full")}
              >
                Book an Appointment
              </button>
              <a href={telHref} className={btn("navy", "lg", "w-full")}>
                <PhoneIcon className="h-[18px] w-[18px]" />
                Call Now · {siteConfig.phone.display}
              </a>
              <a
                href={`mailto:${siteConfig.email.address}`}
                className="mt-1 flex items-center justify-center gap-2 text-sm font-medium text-ash-700"
              >
                <MailIcon className="h-4 w-4" />
                {siteConfig.email.address}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
