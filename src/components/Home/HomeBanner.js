"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marqueeCopy = Array.from({ length: 3 }, () => "It’s Time To Create A Kickstart");

const HomeBanner = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current || !sectionRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { width: "100%", maxWidth: "1200px" },
        {
          width: "100%",
          maxWidth: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=120",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Wait for ParallaxShowcase to be available, then hide banner when it passes
      const setupHideAnimation = () => {
        const parallaxSection = document.querySelector('[data-parallax-section]');
        if (parallaxSection) {
          gsap.to(sectionRef.current, {
            opacity: 0,
            y: -50,
            ease: "power2.out",
            scrollTrigger: {
              trigger: parallaxSection,
              start: "bottom top",
              end: "bottom top+=200",
              scrub: true,
            },
          });
        } else {
          // Retry after a short delay if element not found
          setTimeout(setupHideAnimation, 100);
        }
      };

      setupHideAnimation();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 isolate z-0 flex lg:min-h-[100vh] flex-col items-center justify-between overflow-visible rounded-b-[40px] bg-white px-4 pb-16 pt-36 sm:px-10 lg:px-0"
    >
      <div ref={contentRef} className="mx-auto w-full mt-[100px] flex flex-col items-start justify-end">
        <h1 className="mt-6 text-[32px] font-semibold leading-[1.1] text-black sm:text-[54px] lg:text-[64px]">
          Your Creative, Media &amp; Technology Transformation Partner
        </h1>

        <p className="mt-10 text-lg text-black/70 sm:text-xl">
          We&apos;re a team of 1200+ Specialists delivering award-winning work for 350+ brands worldwide,
          10 years and counting!
        </p>
      </div>

        <div className=" w-full bg-white py-6">
        <div className="flex overflow-hidden">
            <div className="marquee-track flex min-w-full items-center gap-[5rem] whitespace-nowrap uppercase">
              {[...marqueeCopy, ...marqueeCopy].map((text, idx) => (
                <span
                  key={`marquee-left-${idx}`}
                  className="flex items-center gap-6 text-[30px] font-semibold tracking-[0.3em]"
                  style={{ WebkitTextStroke: "1px #111", color: "transparent" }}
                >
                  {text}
                  <Image
                    src="/asset/Home/wheel.avif"
                    alt="wheel"
                    width={36}
                    height={36}
                    className="marquee-wheel h-[50px] w-[50px] object-contain"
                  />
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;