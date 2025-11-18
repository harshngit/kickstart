"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowRoundForward } from "react-icons/io";

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Brand Solutions", description: "Strategy, identity & campaigns.", href: "/solutions#brand" },
      { label: "Tech Solutions", description: "Products, platforms & experience.", href: "/solutions#tech" },
      { label: "Media Solutions", description: "Planning, buying & performance.", href: "/solutions#media" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", description: "Culture, values & people.", href: "/about#story" },
      { label: "Leadership", description: "Meet the leadership team.", href: "/about#leadership" },
      { label: "Offices", description: "Find us across the globe.", href: "/about#offices" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Insights", description: "Deep dives on marketing trends.", href: "/resources#insights" },
      { label: "Case Studies", description: "Proof of impact & scale.", href: "/resources#case-studies" },
      { label: "Newsroom", description: "Press releases & updates.", href: "/resources#news" },
    ],
  },
  { label: "Careers", href: "/careers" },
];

const SOLUTION_SHOWCASE = [
  {
    tag: "Skybags",
    title: "Repositioning of Skybags",
    subtitle: "From a bag to an adventure identity",
    metric: "Adventure Identity",
    gradient: "from-[#113c7a] via-[#1c62c4] to-[#62b1ff]",
  },
  {
    tag: "Mentos",
    title: "Mentos made a mast Gen-Z comeback",
    subtitle: "Campaign clocked 36M+ reach",
    metric: "36M+ Reach",
    gradient: "from-[#2f1ea8] via-[#6241ff] to-[#f9b233]",
  },
];

const ABOUT_SHOWCASE = [
  {
    tag: "Firstpost",
    title: "Vantage",
    subtitle: "Omnichannel Launch & Ad Films",
    metric: "Bold News Show",
    gradient: "from-[#07152e] via-[#123a7a] to-[#4e9bff]",
  },
  {
    tag: "Swiggy Instamart",
    title: "Hyper-personalisation",
    subtitle: "Social campaign with The Great Khali",
    metric: "High Recall",
    gradient: "from-[#f96316] via-[#ef8a00] to-[#fbd135]",
  },
];

const RESOURCE_SHOWCASE = [
  {
    tag: "Blogs",
    title: "The Unknown Side",
    subtitle: "Advantages of Account Based Marketing",
    metric: "ABM Deep Dive",
    gradient: "from-[#1a0f91] via-[#5d24ff] to-[#00f5a0]",
  },
  {
    tag: "The Edge",
    title: "Practices ruling 2025",
    subtitle: "Brand growth playbook for the future",
    metric: "2025 Playbook",
    gradient: "from-[#00c6ff] via-[#0072ff] to-[#004e92]",
  },
];

const FEATURE_MAP = {
  Solutions: SOLUTION_SHOWCASE,
  About: ABOUT_SHOWCASE,
  Resources: RESOURCE_SHOWCASE,
};

export default function NavbarCustom() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const hideTimerRef = useRef(null);

  const handleMouseEnter = (idx) => {
    clearTimeout(hideTimerRef.current);
    setActiveDropdown(idx);
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] font-onest">
      {/* Announcement */}
      <div className="hidden border-b border-black/5 bg-[#fff8f1] px-4 py-2 text-center text-sm text-[#222] md:block">
        <span role="img" aria-label="party">
          🎉
        </span>{" "}
        "Addikt is now part of the Schbang Network.{" "}
        <Link className="font-semibold underline" href="/news/addikt-schbang">
          Read More Here.
        </Link>
        "
      </div>

      {/* Main nav */}
      <div
        className={`bg-white px-4 py-4 shadow-sm transition-shadow duration-200 md:px-10 lg:px-16 ${isScrolled ? "shadow-[0_10px_40px_rgba(15,23,42,0.08)]" : ""}`}
      >
        <div className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Kickstart</h1>
            <span className="text-xs uppercase tracking-[0.3em] text-black/60">Media</span>
          </Link>

          <div className="flex items-center gap-[50px]">
            {/* Desktop nav */}
            <nav className="hidden items-center space-x-[50px] lg:flex">
              {NAV_ITEMS.map((item, idx) => {
                const hasChildren = Boolean(item.children);
                const open = activeDropdown === idx;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && handleMouseEnter(idx)}
                    onMouseLeave={hasChildren ? handleMouseLeave : undefined}
                  >
                    <Link
                      href={item.href}
                      className={`group inline-flex items-center text-[15px] font-medium tracking-tight text-black transition-colors duration-150 ${
                        isActive(item.href) ? "text-[#ff4f00]" : "hover:text-[#ff4f00]"
                      }`}
                    >
                      {item.label}
                      {hasChildren && (
                        <span className="ml-1 text-lg">
                          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </span>
                      )}
                    </Link>

                  {hasChildren && open && (
                    <div className="fixed left-0 right-0 top-[90px] z-[100] hidden pt-6 lg:block">
                      <div className="dropdown-panel mx-auto w-full rounded-[40px] border border-black/10 bg-white px-6 py-10 shadow-[0_40px_80px_rgba(15,23,42,0.12)] md:px-16 lg:px-24">
                        <div className="flex flex-col gap-12 lg:flex-row">
                          <div className="lg:basis-[40%]">
                            <p className="text-xs uppercase tracking-[0.4em] text-black/40">{item.label}</p>
                            <div className="mt-6 space-y-4 text-[35px] font-semibold leading-tight text-black">
                              {item.children.map((child) => (
                                <Link key={child.label} href={child.href} className="block transition-colors hover:text-[#ff4f00]">
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="grid gap-6 lg:grid-cols-2">
                              {(FEATURE_MAP[item.label] ??
                                item.children.map((child) => ({
                                  tag: item.label,
                                  title: child.label,
                                  subtitle: child.description,
                                  metric: child.description,
                                  gradient: "from-[#111] via-[#333] to-[#111]",
                                })))
                                .map((card) => (
                                  <div
                                    key={`${item.label}-${card.title}`}
                                    className="flex h-full flex-col rounded-[32px] bg-[#f7f7f7] p-6"
                                  >
                                    <p className="text-xs font-semibold uppercase tracking-wide text-black/50">{card.tag}</p>
                                    <h4 className="mt-3 text-xl font-semibold text-black">{card.title}</h4>
                                    <p className="text-sm text-black/70">{card.subtitle}</p>
                                    <div
                                      className={`mt-6 flex-1 rounded-[26px] bg-gradient-to-tr ${card.gradient} p-6 text-white shadow-inner`}
                                    >
                                      <p className="text-sm uppercase text-white/80">Highlight</p>
                                      <p className="mt-2 text-2xl font-bold leading-tight">{card.metric}</p>
                                      <p className="mt-4 text-sm text-white/80">
                                        Explore how {card.title} elevates the narrative.
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                );
              })}
            </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff4f00] lg:inline-flex"
            >
              Contact Us
              <IoIosArrowRoundForward className="text-2xl" />
            </Link>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="sr-only">Open menu</span>
              <div className="space-y-1.5">
                <span className="block h-[2px] w-6 bg-black" />
                <span className="block h-[2px] w-6 bg-black" />
                <span className="block h-[2px] w-6 bg-black" />
              </div>
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {menuOpen && (
        <div className="fixed inset-0 z-[10000] bg-white">
          <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Image src="/asset/navbar/blacklogo.png" alt="Schbang Production" width={150} height={30} />
            </Link>
            <button className="text-2xl" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              ×
            </button>
          </div>

          <div className="px-6 py-8">
            <ul className="space-y-6 text-lg font-medium text-black">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <div className="flex flex-col gap-3">
                    <Link href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between">
                      {item.label}
                      {item.children && <IoIosArrowDown className="text-xl" />}
                    </Link>
                    {item.children && (
                      <div className="space-y-3 rounded-2xl bg-black/[0.03] p-4 text-sm font-normal text-black/70">
                        {item.children.map((child) => (
                          <Link key={child.label} href={child.href} onClick={() => setMenuOpen(false)} className="block">
                            <p className="font-semibold text-black">{child.label}</p>
                            <p>{child.description}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-base font-semibold text-white hover:bg-[#ff4f00]"
            >
              Contact Us
              <IoIosArrowRoundForward className="text-2xl" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
