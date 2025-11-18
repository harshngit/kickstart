"use client";

import React, { useEffect, useRef } from "react";

const TEXT_BLOCKS = [
  {
    key: "eyebrow",
    text: "What defines us",
    className: "text-sm uppercase tracking-[0.35em] text-black/70",
  },
  {
    key: "headline",
    text: "We’re brand builders at heart, creators by design, tech enthusiasts in practice, and integrated at our core.",
    className:
      "text-3xl font-semibold leading-snug text-black sm:text-4xl lg:text-[42px] lg:leading-tight",
  },
  {
    key: "body",
    text: "We're on a mission to take the very best of Indian creative talent to the world. Driven by a ferocious hunger to create tangible impact for your business, we work with in-house specialists, industry partners and technology leaders to push the boundaries of creativity and put your brand on the global stage.",
    className: "text-lg text-black/70 sm:text-xl leading-relaxed max-w-2xl",
  },
  {
    key: "cta",
    text: "Dive Into Our Culture →",
    className:
      "inline-flex items-center justify-center rounded-full bg-black px-10 py-4 text-base font-semibold text-white transition hover:bg-black/90",
  },
];

const DefineUsSection = () => {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          typeAllText();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const typeAllText = () => {
    const typingDelay = 16;

    const typeBlock = (index) => {
      const block = TEXT_BLOCKS[index];
      const el = textRefs.current[index];

      if (!block || !el) return Promise.resolve();

      el.textContent = "";

      return new Promise((resolve) => {
        let charIndex = 0;
        const interval = setInterval(() => {
          el.textContent = block.text.slice(0, charIndex + 1);
          charIndex += 1;

          if (charIndex === block.text.length) {
            clearInterval(interval);
            setTimeout(resolve, 150);
          }
        }, typingDelay);
      });
    };

    TEXT_BLOCKS.reduce(
      (promiseChain, _, idx) => promiseChain.then(() => typeBlock(idx)),
      Promise.resolve()
    );
  };

  const assignRef = (index) => (el) => {
    textRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-white px-4 py-24 sm:px-10 lg:px-0"
    >
      <div className="flex w-full  flex-col gap-12 rounded-[32px] bg-white/80 p-6  backdrop-blur lg:flex-row lg:p-12">
        <div className="flex flex-1 flex-col gap-8">
          {TEXT_BLOCKS.slice(0, 3).map((block, index) => (
            <p
              key={block.key}
              ref={assignRef(index)}
              className={`${block.className} whitespace-pre-wrap`}
              aria-label={block.text}
            />
          ))}

          <div className="pt-4">
            <button
              type="button"
              aria-label={TEXT_BLOCKS[3].text}
              className="inline-flex min-h-[60px] items-center"
            >
              <span
                ref={assignRef(3)}
                className={`${TEXT_BLOCKS[3].className} whitespace-pre`}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center lg:w-[320px]">
          <div aria-hidden="true" className="relative h-52 w-52">
            <span className="absolute left-[45%] top-4 h-40 w-10 -translate-x-1/2 origin-bottom rotate-[-45deg] rounded-full bg-black shadow-2xl" />
            <span className="absolute left-6 top-10 h-10 w-28 origin-left rotate-[-135deg] rounded-full bg-black shadow-2xl" />
            <span className="absolute left-6 top-10 h-10 w-28 origin-left rotate-[-45deg] rounded-full bg-black shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefineUsSection;


