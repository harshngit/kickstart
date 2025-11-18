"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "About Us", href: "/aboutus" },
  {
    label: "Products", href: "/products",
    children: [
      { label: "All", href: "/products#all" },
      { label: "Datacentre", href: "/products#data" },
      { label: "Comfort Air Conditioning", href: "/products#comfort" },
      { label: "Industrial Dampers", href: "/products#industries" },
      { label: "Fans & Ventilation Accessories", href: "/products#fans" },
      { label: "Fire Doors", href: "/products#firedoor" },
    ]
  },
  { label: "Projects & Collaborations", href: "/projects" },
  { label: "Contact Us", href: "/contactus" },
];

export default function NavbarCustom() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // your original threshold styling (100px)
  const [scrolling, setScrolling] = useState(false);

  const isActive = (href) => pathname === href;

  useEffect(() => {
    const THRESHOLD = 100;

    const onScroll = () => {
      const y = (typeof window !== 'undefined' && (window.pageYOffset ?? document.documentElement.scrollTop ?? window.scrollY ?? 0)) || 0;
      setScrolling(y > THRESHOLD);
    };

    setScrolling((typeof window !== 'undefined' && (window.pageYOffset ?? document.documentElement.scrollTop ?? window.scrollY ?? 0)) || 0 > THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = (index) => {
    if (timer) clearTimeout(timer);
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    const newTimer = setTimeout(() => setActiveDropdown(null), 300);
    setTimer(newTimer);
  };

  return (
    <div
      className={[
        "fixed font-onest top-0 left-0 w-full z-[9999] transition-all duration-300",
        // keep your paddings
        "lg:pt-[30px] lg:pr-[40px] lg:pb-[20px] lg:pl-[40px] p-[15px]",
        // your color swap after threshold
        scrolling ? "bg-white shadow-sm" : "bg-transparent"
      ].join(" ")}
    >
      <div className=" mx-0 px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        {!menuOpen && 
        
<>
<Link href="/">
          <img
            src={"/asset/navbar/logo.webp"}
            alt="Logo"
            className="h-[32px] md:h-[40px]"
          />
        </Link>
        <div className="block lg:hidden" onClick={() => setMenuOpen(true)}>
          <Image src={"/asset/navbar/iconblue.png"} width={24} height={24} alt="menu" />
        </div>
</>
        }

        {/* Mobile menu button */}
        

        {/* Navigation Menu (desktop) */}
        <ul className={`hidden lg:flex items-center justify-center pl-[7px] pr-[7px] py-2 rounded-full ${scrolling ? "bg-white shadow-lg border-gray-200" : "bg-white shadow-lg border-gray-200 text-white"}`}>
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="relative"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={item.href}
                className={`xl:text-[16px] md:text-[14px] px-2 py-1 ${scrolling ? "text-[#141414] hover:text-[#1666B6]" : "text-[#141414] hover:text-primary"} ${isActive(item.href) ? "text-primary font-bold" : ""}`}
              >
                {item.label}
              </Link>

              {item.children && activeDropdown === idx && (
                <ul className={`absolute font-onest font-regular left-0 top-8 mt-2 space-y-2 px-[16px] py-[10px] w-[200px] shadow-lg rounded-lg ${scrolling ? "bg-white text-black" : "bg-white text-black"}`}>
                  {item.children.map((child, cidx) => (
                    <li key={cidx}>
                      <Link href={child.href} className="hover:text-[#90C4FD]">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {idx !== navItems.length - 1 && (
                <span className={`mx-2 ${scrolling ? "text-[#141414]" : "text-[#141414]"}`}>|</span>
              )}
            </li>
          ))}
          <li>
            <Link href="https://forms.gle/LFuvgta8s3Qe29T8A" target="_blank" className="hidden lg:block">
              <button
                className={`group text-sm flex items-center gap-[20px] ml-5 lg:pl-[20px] lg:pr-[7px] lg:py-2 font-light rounded-full border transition-all duration-200 xl:text-[16px] md:text-[14px]
                ${scrolling ? "bg-primary hover:bg-[#fff] hover:border-primary hover:text-primary text-white border-primary shadow-md" : "hidden"}`}
              >
                Send Inquiry
                <img src="/asset/navbar/Arrow.png" className="w-[28px] h-[28px] group-hover:opacity-0 group-hover:hidden transition-all duration-200 opacity-100" alt="Arrow Hover" />
                <img src="/asset/navbar/Arrowblue.png" className="w-[28px] h-[28px] group-hover:opacity-100 hidden group-hover:block transition-all duration-200 opacity-100" alt="Arrow Hover" />
              </button>
            </Link>
          </li>
        </ul>

        {/* Send Inquiry Button (right, desktop) */}
        <Link href="https://forms.gle/LFuvgta8s3Qe29T8A" target="_blank" className="hidden lg:block">
          <button
            className={`group text-sm flex items-center gap-[20px] pr-[7px] pl-[20px] py-[10px] rounded-full border transition-all duration-200 w-[172px] h-[40px] xl:text-[16px] md:text-[14px]
            ${scrolling ? "hidden" : "bg-transparent border-primary text-primary hover:border-[#1666B6] hover:bg-[#1666B6] hover:text-[#fff]"}`}
          >
            Send Inquiry
            <img src="/asset/Arrowoutlineblue.png" className="w-[28px] h-[28px] group-hover:opacity-0 group-hover:hidden transition-all duration-200 opacity-100" alt="Arrow Hover" />
            <img src="/asset/navbar/Arrow.png" className="w-[28px] h-[28px] group-hover:opacity-100 hidden group-hover:block transition-all duration-200 opacity-100" alt="Arrow Hover" />
          </button>

          <button
            className={`group text-sm flex items-center gap-[20px] pr-[7px] pl-[20px] py-[10px] rounded-full border transition-all duration-200 w-[172px] h-[40px] xl:text-[16px] md:text-[14px]
            ${scrolling ? "bg-primary hover:bg-[#fff] hover:border-primary hover:text-primary text-white border-primary shadow-md hidden" : "hidden"}`}
          >
            Send Inquiry
            <img src="/asset/navbar/Arrow.png" className="w-[28px] h-[28px] group-hover:opacity-0 group-hover:hidden transition-all duration-200 opacity-100" alt="Arrow Hover" />
            <img src="/asset/navbar/Arrowblue.png" className="w-[28px] h-[28px] group-hover:opacity-100 hidden group-hover:block transition-all duration-200 opacity-100" alt="Arrow Hover" />
          </button>
        </Link>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-[99999] bg-[#0F2850] opacity-[80%] backdrop-blur-md flex flex-col justify-start items-start px-6 py-8 text-white transition-all duration-700 h-[100vh]">
            <div className="absolute top-10 right-6 cursor-pointer" onClick={() => setMenuOpen(false)}>
              <Image src={"/asset/navbar/cross.png"} width={24} height={24} alt="close" />
            </div>

            <Link href="/" className="mb-10" onClick={() => setMenuOpen(false)}>
              <img src="/asset/navbar/colorlogo.webp" alt="Logo" className="h-[32px]" />
            </Link>

            <ul className="flex flex-col gap-[20px] text-[18px] font-light">
              <li>
                <Link href={"/"} className={`block hover:text-[#90C4FD] ${isActive("/") ? "text-[#90C4FD]" : ""}`} onClick={() => setMenuOpen(false)}>
                  Home Page
                </Link>
              </li>
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className={`block hover:text-[#90C4FD] ${isActive(item.href) ? "text-[#90C4FD]" : ""}`} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="https://forms.gle/LFuvgta8s3Qe29T8A" target="_blank" onClick={() => setMenuOpen(false)}>
              <button
                  className={`group text-sm bg-white flex items-center mt-10 gap-[20px] pr-[7px] pl-[20px] py-[10px] rounded-full border transition-all duration-200 w-[172px] h-[40px]
                ${scrolling ? "hidden" : "bg-transparent border-primary text-primary hover:border-[#1666B6] hover:bg-[#1666B6] hover:text-[#fff]"}`}
              >
                Send Inquiry
                <img src="/asset/Arrowoutlineblue.png" className="w-[28px] h-[28px] group-hover:opacity-0 group-hover:hidden transition-all duration-200 opacity-100" alt="Arrow Hover" />
                <img src="/asset/navbar/Arrow.png" className="w-[28px] h-[28px] group-hover:opacity-100 hidden group-hover:block transition-all duration-200 opacity-100" alt="Arrow Hover" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
