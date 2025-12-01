"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ParallaxShowcase = () => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const cardTrackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        sectionRef.current,
        { y: 160 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      gsap.to(backgroundRef.current, {
        backgroundPositionY: "80%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: "-8%",
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(cardTrackRef.current, {
        xPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        sectionRef.current,
        { scale: 0.7 },
        {
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "center center",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        glowRef.current,
        { scale: 0.5, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-parallax-section className="relative isolate z-20 overflow-visible pt-24 h-[100vh]">
      

    
        <div
          ref={contentRef}
          className=""
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-[100vh] w-full rounded-t-[40px] object-cover "
          >
            <source src="/asset/Home/calcutexpc.webm" type="video/webm" />
          </video>
        </div>
      
    </section>
  );
};

export default ParallaxShowcase;

