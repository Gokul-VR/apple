"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function UnibodySection() {
  const containerRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const init = () => {
        // --- Label fade in ---
        if (labelRef.current) {
          gsap.fromTo(
            labelRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

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
                trigger: containerRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

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
              stagger: 0.06,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 55%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (imageWrapperRef.current) {
          gsap.fromTo(
            imageWrapperRef.current,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: imageWrapperRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      };

      // On desktop, wait for HeroSequence to finish setting up its pin
      // before registering scroll triggers so positions are correct
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
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-black py-24 md:py-32 px-4 md:px-8 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        <span
          ref={labelRef}
          className="text-[#F56900] font-semibold text-lg md:text-xl mb-4"
        >
          Design
        </span>
        <h2
          ref={headingRef}
          className="text-4xl md:text-[3.5rem] font-bold mb-10 tracking-tight leading-tight"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-br from-white to-neutral-500">
            Unibody enclosure. Makes a strong case for itself.
          </span>
        </h2>

        <p
          ref={paragraphRef}
          className="text-[#a1a1a6] text-base md:text-[1.1rem] md:leading-relaxed max-w-3xl mb-3 font-medium"
        >
          Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from the
          inside out to be the most powerful iPhone models ever made. At the
          core of the new design is a heat-forged aluminium unibody enclosure
          that maximises performance, battery capacity and durability.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto flex justify-center">
        <div
          ref={imageWrapperRef}
          className="relative w-full aspect-2/1 md:aspect-2.5/1"
        >
          <Image
            src="/unibody.jpg"
            alt="Unibody enclosure"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
