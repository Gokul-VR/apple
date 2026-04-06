"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

import localFont from "next/font/local";

const korataki = localFont({
  src: "../public/font/Korataki Regular.ttf",
  variable: "--font-korataki",
});

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // We use useGSAP instead of useLayoutEffect, it's safer in Next App Router
  useGSAP(
    () => {
      // Abort resource-heavy canvas animation sequence on mobile and fallback to standard view!
      if (window.innerWidth < 768) return;

      gsap.registerPlugin(ScrollTrigger);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      const currentImages: HTMLImageElement[] = [];
      let hitEnd = false;
      let currentIndexToCheck = 1;

      const render = (index: number) => {
        if (!imagesRef.current[index]) return;
        const img = imagesRef.current[index];

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          // Canvas is wider than image. Constrain by height to perfectly fit without cropping top/bottom.
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        } else {
          // Canvas is taller than image. Constrain by width.
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      const loadNext = () => {
        if (hitEnd) return;
        const img = new window.Image();
        const paddedIndex = currentIndexToCheck.toString().padStart(3, "0");
        img.src = `/frames/ezgif-frame-${paddedIndex}.png`;

        img.onload = () => {
          currentImages.push(img);

          if (currentIndexToCheck === 1) {
            imagesRef.current = currentImages;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(0);
          }

          currentIndexToCheck++;
          loadNext(); // recursively fetch the next frame
        };

        img.onerror = () => {
          // Reached the end of the frames
          hitEnd = true;
          imagesRef.current = currentImages;
          const finalCount = currentImages.length;

          if (finalCount > 0) {
            setupAnimation(finalCount);
          }
        };
      };

      // Start the sequential frame loading
      loadNext();

      const setupAnimation = (finalFrameCount: number) => {
        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          render(Math.round(sequenceProxy.frameIndex));
        };
        window.addEventListener("resize", handleResize);

        const sequenceProxy = { frameIndex: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 0.5,
            markers: false,
          },
        });

        tl.to(
          textRef.current,
          {
            opacity: 0,
            y: -50,
            duration: 0.15,
            ease: "power2.out",
          },
          0,
        );

        tl.to(
          sequenceProxy,
          {
            frameIndex: finalFrameCount - 1,
            snap: "frameIndex",
            ease: "none",
            duration: 1,
            onUpdate: () => render(Math.round(sequenceProxy.frameIndex)),
          },
          0,
        );

        // Crucial: Refresh ScrollTrigger so that subsequent sections (like UnibodySection)
        // are pushed down and recalculate their start/end positions based on this new pin spacer.
        ScrollTrigger.refresh();
        window.dispatchEvent(new CustomEvent("hero-sequence-ready"));

        return () => window.removeEventListener("resize", handleResize);
      };

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      <div
        ref={textRef}
        className="absolute top-[12%] md:top-[30%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10 pointer-events-none text-center"
      >
        <span className="text-[#ffff] text-3xl md:text-5xl font-bold tracking-tight mb-[-2px] md:mb-[-08px]">
          iPhone 17
        </span>
        <h1 className="text-[80px] md:text-[180px] leading-none text-transparent bg-clip-text bg-linear-to-b md:bg-linear-to-r from-[#ffbe76] via-[#f0932b] to-[#e15f41] flex flex-col items-center tracking-tighter">
          <span className={korataki.className}>PRO</span>
        </h1>
      </div>

      {isMobile && mounted ? (
        <Image
          src="/hero-mobile.jpg"
          fill
          priority
          className="absolute inset-0 block object-cover"
          alt="iPhone 17 Pro Hero Mobile"
        />
      ) : (
        <canvas
          ref={canvasRef}
          className={`${mounted && isMobile ? "hidden" : "block"} absolute inset-0 w-full h-full object-cover`}
        />
      )}
    </section>
  );
}
