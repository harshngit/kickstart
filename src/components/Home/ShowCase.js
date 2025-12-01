"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const SLIDES = [
  {
    id: "slide-1",
    brand: "Britannia",
    headline: "Creating the first-ever Coffeeverse!",
    linkLabel: "View case study",
  },
  {
    id: "slide-2",
    brand: "Kickstart Collective",
    headline: "Building immersive launches for iconic Indian brands.",
    linkLabel: "Explore launch",
  },
  {
    id: "slide-3",
    brand: "Future Studio",
    headline: "Designing connected experiences across phygital worlds.",
    linkLabel: "See experience",
  },
];

const ShowCase = () => {
  const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });
  const leftSwiperRef = useRef(null);
  const rightSwiperRef = useRef(null);

  useEffect(() => {
    if (leftSwiperRef.current?.swiper && rightSwiperRef.current?.swiper) {
      const leftSwiper = leftSwiperRef.current.swiper;
      const rightSwiper = rightSwiperRef.current.swiper;

      // Initialize right swiper to last slide
      rightSwiper.slideToLoop(SLIDES.length - 1, 0);

      // Sync right swiper to move opposite to left swiper
      leftSwiper.on("slideChange", () => {
        const totalSlides = SLIDES.length;
        const currentIndex = leftSwiper.realIndex;
        const oppositeIndex = (totalSlides - 1 - currentIndex) % totalSlides;
        rightSwiper.slideToLoop(oppositeIndex, 800);
      });
    }
  }, []);

  const handleMouseMove = (event) => {
    setCursor({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const hideCursor = () => {
    setCursor((prev) => ({ ...prev, visible: false }));
  };

  return (
    <section className="relative w-full bg-white py-28">

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Panel - Slides Up */}
        <div
          className="relative h-[100vh]"
          onMouseMove={handleMouseMove}
          onMouseLeave={hideCursor}
        >
          <Swiper
            ref={leftSwiperRef}
            modules={[Autoplay]}
            direction="vertical"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            className=" h-full"
          >
            {SLIDES.map((slide) => (
              <SwiperSlide key={`left-${slide.id}`}>
                <div className="relative w-full h-full flex flex-col justify-center items-center  cursor-none">
                  <div className="relative w-full h-full flex flex-col justify-end overflow-hidden  bg-gradient-to-br from-neutral-300 via-neutral-400 to-neutral-500 p-8">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-10 left-10 w-32 h-32 bg-neutral-600 rounded-full blur-xl" />
                      <div className="absolute top-40 right-20 w-24 h-24 bg-neutral-700 rounded-full blur-lg" />
                      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-neutral-600 rounded-full blur-2xl" />
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="inline-flex items-center gap-3 rounded-full border border-black/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-black/70 bg-white/50">
                        {slide.brand}
                      </div>
                      <h3 className="text-3xl font-semibold leading-snug text-black">
                        {slide.headline}
                      </h3>
                      <button
                        type="button"
                        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition hover:translate-x-2"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Panel - Slides Down */}
        <div
          className="relative h-[100vh]"
          onMouseMove={handleMouseMove}
          onMouseLeave={hideCursor}
        >
          <Swiper
            ref={rightSwiperRef}
            modules={[Autoplay]}
            direction="vertical"
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={800}
            allowTouchMove={false}
            className=" h-full"
          >
            {SLIDES.map((slide) => (
              <SwiperSlide key={`right-${slide.id}`}>
                <div className="relative w-full h-full flex flex-col justify-center items-center  cursor-none">
                  <div className="relative w-full h-full overflow-hidden  bg-gradient-to-br from-neutral-300 via-neutral-400 to-neutral-500">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-10 right-10 w-32 h-32 bg-neutral-600 rounded-full blur-xl" />
                      <div className="absolute top-40 left-20 w-24 h-24 bg-neutral-700 rounded-full blur-lg" />
                      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-neutral-600 rounded-full blur-2xl" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
                      <div className="relative z-10 space-y-6 text-center">
                        <div className="inline-flex items-center gap-3 rounded-full border border-black/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-black/70 bg-white/50">
                          {slide.brand}
                        </div>
                        <h3 className="text-3xl font-semibold leading-snug text-black">
                          {slide.headline}
                        </h3>
                        <div className="absolute bottom-6 left-6 rounded-full border border-black/30 bg-white/90 px-4 py-2 text-sm font-medium text-black">
                          {slide.linkLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* <div
        className={`pointer-events-none fixed z-[999] mt-[-40px] inline-flex items-center justify-center rounded-full border border-black bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black transition-opacity duration-200 ${
          cursor.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        View case
      </div>

      <style jsx global>{`
        .showcase-swiper-vertical {
          width: 100%;
          height: 100%;
        }

        .showcase-swiper-vertical .swiper-slide {
          width: 100%;
          height: 100%;
        }

        .showcase-swiper-left .swiper-wrapper {
          transition-timing-function: ease-in-out;
        }

        .showcase-swiper-right .swiper-wrapper {
          transition-timing-function: ease-in-out;
        }
      `}</style> */}
    </section>
  );
};

export default ShowCase;

