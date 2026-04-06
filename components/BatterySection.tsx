"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

const batteryStats = [
  {
    id: 1,
    prefix: "Up to",
    value: "31 hours",
    description: "video playback on iPhone 17 Pro",
    sup: "12",
    color: "#F56900",
  },
  {
    id: 2,
    prefix: "Up to",
    value: "37 hours",
    description: "video playback on iPhone 17 Pro Max",
    sup: "12",
    color: "#F56900",
  },
  {
    id: 3,
    prefix: "Up to",
    value: "50% charge",
    extra: "in 20 minutes",
    description: "with high-wattage power adapter",
    sup: "13",
    color: "#F56900",
  },
];

export default function BatterySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading SplitText animation
      if (headingRef.current) {
        const headingSplit = SplitText.create(headingRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.fromTo(
          headingSplit.lines,
          { y: "100%" },
          {
            y: "0%",
            stagger: 0.12,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Paragraph fade in
      if (paragraphRef.current) {
        const paraSplit = SplitText.create(paragraphRef.current, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        gsap.fromTo(
          paraSplit.lines,
          { y: "100%" },
          {
            y: "0%",
            stagger: 0.05,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Stats stagger
      if (statsRef.current) {
        const statItems =
          statsRef.current.querySelectorAll(".battery-stat-item");
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black pt-24 md:pt-32 pb-16 md:pb-24"
    >
      <div className="max-w-full ">
        {/* Text block */}
        <div className="flex flex-col items-start gap-6 md:gap-8 mb-0 px-6 md:px-16 lg:px-16 relative z-10 w-full max-w-[1350px] mx-auto">
          {/* Heading */}
          <div className="w-full justify-start text-left">
            <h2
              ref={headingRef}
              className="text-4xl md:text-[4rem] lg:text-[4.5rem] font-bold tracking-tight leading-[1.08]"
            >
              <span className="text-[#f5f5f7]">Battery life.</span>
              <br />
              <span className="text-[#f5f5f7]">All‑time high.</span>
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-2xl lg:max-w-xl text-left">
            <p
              ref={paragraphRef}
              className="text-[#86868b] text-base md:text-lg leading-relaxed font-medium"
            >
              The new internal design creates significant additional room for
              battery capacity, giving iPhone 17 Pro Max the{" "}
              <strong className="text-[#f5f5f7]">
                best‑ever iPhone battery life
              </strong>
              <sup className="text-[10px]">10</sup> &nbsp;and up to 3 more hours
              per full charge compared to iPhone 15 Pro Max. From extended video
              playback to after-hours work, it&apos;s always ready for overtime.
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div
          ref={imageRef}
          className="relative w-full h-[250px] sm:h-[450px] md:h-auto md:aspect-16/8 mt-0 md:-mt-48 lg:-mt-64 mb-16 md:mb-20"
        >
          <Image
            src="/batter-section.jpg"
            alt="iPhone 17 Pro displaying SILO on Apple TV+"
            fill
            className="object-cover md:object-contain object-[70%_center] md:object-center"
            priority
          />
        </div>

        {/* Battery stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 md:px-50"
        >
          {batteryStats.map((stat) => (
            <div key={stat.id} className="battery-stat-item">
              <p className="text-[#86868b] text-sm font-medium mb-1">
                {stat.prefix}
              </p>
              <p
                className="text-2xl md:text-3xl font-bold tracking-tight leading-tight"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              {stat.extra && (
                <p
                  className="text-xl md:text-2xl font-bold tracking-tight leading-tight"
                  style={{ color: stat.color }}
                >
                  {stat.extra}
                </p>
              )}
              <p className="text-[#86868b] text-xs md:text-sm font-medium mt-1 leading-snug">
                {stat.description}
                <sup className="text-[10px] ml-0.5">{stat.sup}</sup>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
