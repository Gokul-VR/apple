"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const init = () => {
        // Headline animation
        if (headlineRef.current) {
          gsap.fromTo(
            headlineRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        // Cards stagger animation
        const cards = gsap.utils.toArray<HTMLElement>(".bento-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".bento-grid",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      };

      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        init();
      } else {
        window.addEventListener("hero-sequence-ready", init, { once: true });
      }

      return () => {
        window.removeEventListener("hero-sequence-ready", init);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full bg-black py-2 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto bg-[#111113] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 lg:p-16">
        {/* Headline */}
        <p
          ref={headlineRef}
          className="text-[#86868b] text-lg md:text-xl font-medium mb-8 md:mb-12"
        >
          A few ways{" "}
          <span className="text-[#f5f5f7] font-semibold">iPhone 17 Pro</span>{" "}
          gives you more.
        </p>

        {/* Bento Grid */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Card 1 — Forged aluminium unibody */}
          <div className="bento-card relative rounded-2xl md:rounded-[1.25rem] bg-black overflow-hidden flex flex-col justify-between min-h-[280px] md:min-h-[340px]">
            <div className="p-5 md:p-6">
              <p className="text-[#a1a1a6] text-sm md:text-base font-medium text-center leading-snug">
                Forged aluminium
                <br />
                unibody design
              </p>
            </div>
            <div className="relative w-full h-full">
              <Image
                src="/unibody.jpg"
                alt="Battery icon"
                fill
                className="object-contain px-8"
              />
            </div>
          </div>

          {/* Card 2 — 14 more hours battery */}
          <div className="bento-card relative rounded-2xl md:rounded-[1.25rem] bg-black overflow-hidden flex flex-col items-center justify-center min-h-[280px] md:min-h-[340px] p-5 md:p-6">
            <p className="text-[#a1a1a6] text-sm md:text-base font-medium mb-2">
              Up to
            </p>
            <h3 className="text-white text-4xl md:text-5xl font-bold tracking-tight leading-none text-center mb-2">
              14 more
              <br />
              hours
            </h3>
            <div className="relative w-[52px] h-[24px] my-2">
              <Image
                src="/battery.png"
                alt="Battery icon"
                fill
                className="object-contain"
                sizes="52px"
              />
            </div>
            <p className="text-[#a1a1a6] text-xs md:text-sm font-medium text-center mt-1 leading-snug">
              video playback
              <br />
              on iPhone 17 Pro Max
              <sup className="text-[10px]">10</sup>
            </p>
          </div>

          {/* Card 3 — 48MP rear cameras */}
          <div className="bento-card relative rounded-2xl md:rounded-[1.25rem] bg-black overflow-hidden flex flex-col justify-between min-h-[280px] md:min-h-[340px]">
            <div className="p-5 md:p-6">
              <p className="text-[#a1a1a6] text-sm md:text-base font-medium text-center leading-snug">
                48MP rear cameras and
                <br />
                Camera Control
              </p>
            </div>
            <div className="relative w-full h-full my-2">
              <Image
                src="/cameras_camera_control.jpg"
                alt="Battery icon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 4 — 2x faster GPU */}
          <div className="bento-card relative rounded-2xl md:rounded-[1.25rem] bg-black overflow-hidden flex flex-col items-center justify-center min-h-[280px] md:min-h-[340px] p-5 md:p-6">
            <p className="text-[#a1a1a6] text-sm md:text-base font-medium mb-2">
              Up to
            </p>
            <h3 className="text-white text-6xl md:text-7xl font-bold tracking-tighter leading-none text-center">
              2x
            </h3>
            <p className="text-white text-xl md:text-2xl font-bold tracking-tight text-center mt-1">
              faster
            </p>
            <p className="text-[#a1a1a6] text-xs md:text-sm font-medium text-center mt-2">
              GPU performance
            </p>
          </div>

          {/* Card 5 — 18MP Center Stage */}
          <div className="bento-card relative rounded-2xl md:rounded-[1.25rem] bg-black overflow-hidden flex flex-col justify-between min-h-[280px] md:min-h-[340px]">
            <div className="p-5 md:p-6">
              <p className="text-[#a1a1a6] text-sm md:text-base font-medium text-center leading-snug">
                18MP Center Stage
                <br />
                front camera
              </p>
            </div>
            <div className="relative w-full h-full my-2">
              <Image
                src="/center_stage.jpg"
                alt="Battery icon"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 6 — 4K 120 fps Dolby Vision */}
          <div className="bento-card relative rounded-2xl md:rounded-[1.25rem] bg-black overflow-hidden flex flex-col items-center justify-center min-h-[280px] md:min-h-[340px] p-5 md:p-6">
            {/* Film icon */}
            <div className="mb-4">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="10"
                  width="40"
                  height="28"
                  rx="2"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                />
                <rect x="8" y="14" width="4" height="4" rx="0.5" fill="white" />
                <rect x="8" y="22" width="4" height="4" rx="0.5" fill="white" />
                <rect x="8" y="30" width="4" height="4" rx="0.5" fill="white" />
                <rect
                  x="36"
                  y="14"
                  width="4"
                  height="4"
                  rx="0.5"
                  fill="white"
                />
                <rect
                  x="36"
                  y="22"
                  width="4"
                  height="4"
                  rx="0.5"
                  fill="white"
                />
                <rect
                  x="36"
                  y="30"
                  width="4"
                  height="4"
                  rx="0.5"
                  fill="white"
                />
                <rect
                  x="15"
                  y="14"
                  width="18"
                  height="20"
                  rx="1"
                  fill="white"
                  fillOpacity="0.15"
                />
              </svg>
            </div>
            <p className="text-white text-sm md:text-base font-semibold text-center leading-snug">
              Record video in
              <br />
              4K 120 fps Dolby Vision
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
