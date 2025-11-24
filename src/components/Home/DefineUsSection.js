"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_ARROW_ANGLE = -45;
const EASING = 0.08;
const EYEBROW_TEXT = "What defines us";
const HEADLINE_TEXT =
  "We’re brand builders at heart, creators by design, tech enthusiasts in practice, and integrated at our core.";
const BODY_TEXT =
  "We're on a mission to take the very best of Indian creative talent to the world. Driven by a ferocious hunger to create tangible impact for your business, we work with in-house specialists, industry partners and technology leaders to push the boundaries of creativity and put your brand on the global stage.";
const EYEBROW_WORDS = EYEBROW_TEXT.split(" ");
const HEADLINE_WORDS = HEADLINE_TEXT.split(" ");
const BODY_WORDS = BODY_TEXT.split(" ");

const DefineUsSection = () => {
  const sectionRef = useRef(null);
  const arrowBoxRef = useRef(null);
  const animationFrameRef = useRef(null);
  const targetAngleRef = useRef(DEFAULT_ARROW_ANGLE);
  const currentAngleRef = useRef(DEFAULT_ARROW_ANGLE);
  const [displayAngle, setDisplayAngle] = useState(DEFAULT_ARROW_ANGLE);
  const [visibleEyebrowWords, setVisibleEyebrowWords] = useState(0);
  const [visibleHeadlineWords, setVisibleHeadlineWords] = useState(0);
  const [visibleBodyWords, setVisibleBodyWords] = useState(0);
  const animationStartedRef = useRef(false);
  const timeoutsRef = useRef([]);

  const clearScheduledAnimations = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  const animateWords = useCallback(
    (wordsLength, setter, delay) =>
      new Promise((resolve) => {
        let index = 0;
        const tick = () => {
          index += 1;
          setter(index);

          if (index < wordsLength) {
            const timeoutId = window.setTimeout(tick, delay);
            timeoutsRef.current.push(timeoutId);
          } else {
            resolve();
          }
        };

        tick();
      }),
    []
  );

  const startWordAnimation = useCallback(() => {
    clearScheduledAnimations();
    setVisibleEyebrowWords(0);
    setVisibleHeadlineWords(0);
    setVisibleBodyWords(0);

    animateWords(EYEBROW_WORDS.length, setVisibleEyebrowWords, 100)
      .then(() =>
        animateWords(HEADLINE_WORDS.length, setVisibleHeadlineWords, 90)
      )
      .then(() => animateWords(BODY_WORDS.length, setVisibleBodyWords, 40));
  }, [animateWords, clearScheduledAnimations]);

  useEffect(() => {
    const animate = () => {
      const current = currentAngleRef.current;
      const target = targetAngleRef.current;
      const next = current + (target - current) * EASING;

      currentAngleRef.current = next;
      setDisplayAngle(next);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => clearScheduledAnimations();
  }, [clearScheduledAnimations]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStartedRef.current) {
          animationStartedRef.current = true;
          startWordAnimation();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [startWordAnimation]);

  const handleMouseMove = (event) => {
    const rect = arrowBoxRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angleInRadians = Math.atan2(
      event.clientY - centerY,
      event.clientX - centerX
    );
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
    targetAngleRef.current = angleInDegrees;
  };

  const handleMouseLeave = () => {
    targetAngleRef.current = DEFAULT_ARROW_ANGLE;
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 flex w-full items-start flex-col lg:flex-row justify-start bg-white px-4 py-[120px] lg:px-24 lg:pb-[50px] lg:pt-[150px]"
    >
      <div className="flex w-full lg:w-[40%] flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-center justify-center gap-5 text-center lg:text-left">
          <div className="text-5xl font-bold leading-tight text-black">
            {EYEBROW_WORDS.map((word, index) => (
              <span
                key={`eyebrow-${word}-${index}`}
                className={`inline-block transition-all duration-300 ease-out ${
                  index < visibleEyebrowWords
                    ? "opacity-100 translate-y-0"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {word}
                {index < EYEBROW_WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </div>
          <div ref={arrowBoxRef} className="flex items-center justify-center">
            <Image
              src="/asset/Home/arrow.png"
              alt="arrow"
              width={200}
              height={200}
              draggable={false}
              style={{
                transform: `rotate(${displayAngle}deg)`,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex lg:w-[60%] w-full flex-col items-start justify-start gap-8">
        <div className="flex flex-col items-start justify-start gap-[50px]">
          <div className="text-3xl font-bold leading-snug text-black">
            {HEADLINE_WORDS.map((word, index) => (
              <span
                key={`headline-${index}-${word}`}
                className={`inline-block transform transition-all duration-300 ease-out ${
                  index < visibleHeadlineWords
                    ? "opacity-100 translate-y-0"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {word}
                {index < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </div>
          <p className="text-xl leading-relaxed text-gray-500">
            {BODY_WORDS.map((word, index) => (
              <span
                key={`body-${index}-${word}`}
                className={`inline-block transform transition-all duration-200 ease-out ${
                  index < visibleBodyWords
                    ? "opacity-100 translate-y-0"
                    : "translate-y-2 opacity-0"
                }`}
              >
                {word}
                {index < BODY_WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </p>
          <button
            type="button"
            className="cta-button mt-4"
          >
            <span className="cta-button__bg" aria-hidden="true" />
            <span className="cta-button__content">
              Dive Into Our Culture
              <span aria-hidden="true" className="text-lg">
                &rarr;
              </span>
            </span>
          </button>
          
        </div>
      </div>
      <style jsx>{`
        .cta-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 999px;
          border: 1px solid #000;
          background: #000;
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          overflow: hidden;
          cursor: pointer;
          transition: color 0.4s ease;
        }

        .cta-button__bg {
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateX(-100%) skewX(-10deg);
          transition: transform 0.45s cubic-bezier(0.55, 0, 0.1, 1);
        }

        .cta-button:hover .cta-button__bg,
        .cta-button:focus-visible .cta-button__bg {
          transform: translateX(0) skewX(-10deg);
        }

        .cta-button__content {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.45s cubic-bezier(0.55, 0, 0.1, 1);
        }

        .cta-button:hover .cta-button__content,
        .cta-button:focus-visible .cta-button__content {
          color: #000;
        }

        .cta-button:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
};

export default DefineUsSection;
