"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const featuresData = [
  {
    id: 1,
    title: "Pro-Level Performance.",
    description: "Built for speed. With an advanced architecture that slices through intensive workloads like never before.",
  },
  {
    id: 2,
    title: "Brilliant Retina Display.",
    description: "Pixels so precise, everything you do looks impossibly sharp and incredibly lifelike.",
  },
  {
    id: 3,
    title: "All-Day Battery Life.",
    description: "Power that lasts. Keep moving, creating, and playing without ever looking for an outlet.",
  },
  {
    id: 4,
    title: "Advanced Security.",
    description: "Your data stays yours. Hardware-level encryption ensuring privacy at every core level.",
  }
];

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Headline Reveal
    gsap.from(headlineRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Staggered Cards Reveal
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%",
      },
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-black text-white selection:bg-white selection:text-black min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 ref={headlineRef} className="text-4xl md:text-6xl font-bold tracking-tighter mb-24 max-w-2xl bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
          A new era of power. Unleashed.
        </h2>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {featuresData.map((feature) => (
            <div key={feature.id} className="feature-card flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                 {/* Decorative simple icon placeholder */}
                 <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
