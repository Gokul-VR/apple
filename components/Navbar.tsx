"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Store", href: "#store" },
  { label: "Mac", href: "#mac" },
  { label: "iPad", href: "#ipad" },
  { label: "iPhone", href: "#iphone" },
  { label: "Watch", href: "#watch" },
  { label: "AirPods", href: "#airpods" },
  { label: "TV & Home", href: "#tv" },
  { label: "Entertainment", href: "#entertainment" },
  { label: "Accessories", href: "#accessories" },
  { label: "Support", href: "#support" },
];

const devices = [
  {
    name: "iPhone 17 Pro",
    desc: "Currently viewing",
    img: "/explore/ip-17pro.png",
  },
  { name: "iPhone Air", img: "/explore/ip-air.png" },
  { name: "iPhone 17", img: "/explore/ip-17.png" },
  {
    name: "iPhone 17e",
    desc: "New",
    descColor: "text-[#f56300]",
    img: "/explore/ip-17e.png",
  },
  { name: "iPhone 16", img: "/explore/ip-16.png" },
  { name: "Compare", img: "/explore/compare.png" },
  { name: "Accessories", img: "/explore/accessories.png" },
  { name: "ios", img: "/explore/ios.png" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isExpanded || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isExpanded, isMobileMenuOpen]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      setTimeout(checkScroll, 100);
    }
  }, [isExpanded]);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const distance = isMobile ? window.innerWidth * 0.7 : 400;
      scrollContainerRef.current.scrollBy({
        left: distance,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400); // re-check after animation completes
    }
  };

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      const distance = isMobile ? window.innerWidth * 0.7 : 400;
      scrollContainerRef.current.scrollBy({
        left: -distance,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  const MORPH_TRANSITION = {
    type: "spring" as const,
    bounce: 0,
    duration: 0.7,
  };

  return (
    <>
      {/* Background overlay for Expanded Mode */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md pointer-events-auto"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Full Screen Mobile Main Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className="fixed inset-0 z-60 bg-[#1d1d1f] flex flex-col px-6 pt-6 pb-20 overflow-y-auto no-scrollbar"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white opacity-80 hover:opacity-100 p-2 -mr-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L13 13M1 13L13 1"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col gap-6 text-white text-[24px] font-semibold mt-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.03 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Top Nav - Hides when scrolled */}
      <motion.header
        animate={{
          y: isScrolled || isExpanded || isMobileMenuOpen ? "-100%" : "0%",
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        <nav className="max-w-[904px] mx-auto flex items-center justify-between h-11 px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="Apple"
              width={15}
              height={18}
              className="object-contain"
            />
          </Link>

          {/* Center Nav Links */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/80 hover:text-white text-[12px] font-normal tracking-tight px-[10px] transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              aria-label="Search"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 17"
                width="15"
                height="15"
                fill="white"
              >
                <path d="M14.72 13.85L11.3 10.43a5.5 5.5 0 1 0-.87.87l3.41 3.41a.62.62 0 0 0 .88-.87ZM2.5 7a4.5 4.5 0 1 1 4.5 4.5A4.5 4.5 0 0 1 2.5 7Z" />
              </svg>
            </button>
            <button
              aria-label="Shopping Bag"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 17"
                width="15"
                height="15"
                fill="white"
              >
                <path d="M15.25 5.5h-2A3.25 3.25 0 0 0 10 2.25h-.5A3.25 3.25 0 0 0 6.25 5.5h-2a1 1 0 0 0-1 1v8.25a1.25 1.25 0 0 0 1.25 1.25h9a1.25 1.25 0 0 0 1.25-1.25V6.5a1 1 0 0 0-1-1Zm-5.75-2h.5a2.25 2.25 0 0 1 2.24 2h-5A2.25 2.25 0 0 1 9.5 3.5Zm5.25 11.25a.25.25 0 0 1-.25.25h-9a.25.25 0 0 1-.25-.25V6.5h1.5v1.25a.5.5 0 1 0 1 0V6.5h5v1.25a.5.5 0 0 0 1 0V6.5h1.25Z" />
              </svg>
            </button>
            {/* Mobile Hamburger Icon */}
            <button
              className="md:hidden opacity-80 hover:opacity-100 transition-opacity ml-1"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M2 6H16 M2 12H16"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Pill / Expanded Menu Container */}
      <motion.div
        animate={{
          y: isExpanded ? (isMobile ? 20 : 40) : isScrolled ? 12 : -60,
          width: isExpanded
            ? isMobile
              ? "calc(100vw - 32px)"
              : 900
            : isMobile
              ? "calc(100vw - 32px)"
              : 600,
          height: isExpanded ? (isMobile ? "calc(100vh - 80px)" : 600) : 48,
          borderRadius: isExpanded ? 28 : 24,
          opacity: isExpanded || isScrolled ? 1 : 0,
        }}
        transition={MORPH_TRANSITION}
        className="fixed top-0 left-1/2 z-50 overflow-hidden bg-[#101010] shadow-2xl pointer-events-auto"
        style={{ x: "-50%", originY: 0 }}
      >
        {/* Animated Expanding Title */}
        <motion.div
          animate={{
            left: isExpanded ? (isMobile ? 24 : 50) : 20,
            top: isExpanded ? (isMobile ? 230 : 280) : 24,
            y: isExpanded ? 0 : "-50%",
            fontSize: isExpanded ? (isMobile ? 28 : 36) : 14,
            fontWeight: isExpanded ? 600 : 500,
          }}
          transition={MORPH_TRANSITION}
          className="absolute text-white whitespace-nowrap z-30 tracking-tight origin-left"
        >
          iPhone 17 Pro
        </motion.div>

        {/* Pill Mode Action Buttons (Explore, Buy) */}
        <motion.div
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-[6px] z-30"
          style={{ pointerEvents: isExpanded ? "none" : "auto" }}
        >
          <button
            onClick={() => setIsExpanded(true)}
            className="text-[12px] font-medium text-white px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            Explore
          </button>
          <button className="text-[12px] font-medium text-white px-[14px] py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] transition-colors">
            Buy
          </button>
        </motion.div>

        {/* Expanded Mode Close Button */}
        <motion.button
          animate={{ opacity: isExpanded ? 1 : 0, scale: isExpanded ? 1 : 0.8 }}
          transition={{ duration: 0.3, delay: isExpanded ? 0.3 : 0 }}
          style={{ pointerEvents: isExpanded ? "auto" : "none" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center hover:cursor-pointer bg-[#242424] hover:bg-[#343434] rounded-full z-40"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* Expanded Mode Content */}
        <motion.div
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.4, delay: isExpanded ? 0.2 : 0 }}
          style={{ pointerEvents: isExpanded ? "auto" : "none" }}
          className="absolute inset-0 px-6 md:px-[50px] z-10 overflow-y-auto no-scrollbar"
        >
          <div className="flex flex-col min-h-max pb-12 pt-0">
            {/* Top devices grid */}
            <div
              className="relative border-b border-white/10 pb-6 md:pb-8 pt-20 flex items-center shrink-0 w-full"
              style={{ scrollbarWidth: "none" }}
            >
              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto no-scrollbar gap-8 md:gap-10 w-full pr-12 pl-2"
                style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
              >
                {devices.map((device, i) => (
                  <div
                    key={device.name}
                    className="flex flex-col items-center gap-2 group cursor-pointer shrink-0"
                  >
                    <div className="w-[50px] md:w-[60px] h-[60px] md:h-[72px] flex items-end justify-center mb-1 transition-transform group-hover:scale-105">
                      <Image
                        src={device.img}
                        alt={device.name}
                        width={60}
                        height={72}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                    <span className="text-[11px] md:text-[12px] text-white font-medium group-hover:text-white/80 transition-colors">
                      {device.name}
                    </span>
                    <span
                      className={`text-[9px] md:text-[10px] ${device.descColor || "text-[#86868b]"} h-3`}
                    >
                      {device.desc || ""}
                    </span>
                  </div>
                ))}
              </div>

              {/* Left Scroll Arrow */}
              {canScrollLeft && (
                <>
                  <div className="absolute left-0 top-0 bottom-8 w-12 md:w-24 bg-gradient-to-r from-[#101010] to-transparent pointer-events-none z-10" />
                  <button
                    onClick={scrollLeftBtn}
                    className="absolute left-0 top-[105px] text-white opacity-80 hover:opacity-100 transition-opacity z-20 bg-[#1e1e1e] border border-white/10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  >
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 9L1 5L5 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Right Scroll Arrow */}
              {canScrollRight && (
                <>
                  <div className="absolute right-0 top-0 bottom-8 w-12 md:w-24 bg-gradient-to-l from-[#101010] to-transparent pointer-events-none z-10" />
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-[105px] text-white opacity-80 hover:opacity-100 transition-opacity z-20 bg-[#1e1e1e] border border-white/10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  >
                    <svg
                      width="6"
                      height="10"
                      viewBox="0 0 6 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9L5 5L1 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Price and Buy in Expanded (Responsive Positioning) */}
            <div className="flex items-center md:absolute md:right-[50px] md:top-[280px] gap-4 md:gap-[20px] mt-[65px] md:mt-0">
              <div className="text-left md:text-right flex flex-col justify-center">
                <span className="text-[14px] text-white font-medium mb-0.5">
                  From ₹134900.00*
                </span>
                <span className="text-[12px] text-[#86868b]">
                  or ₹21650.00/mo. for 6 mo.‡
                </span>
              </div>
              <button className="text-[14px] font-normal text-white px-5 py-[7px] rounded-full bg-[#0071e3] hover:bg-[#0077ed] transition-colors ml-auto md:ml-0">
                Buy
              </button>
            </div>

            {/* Overview Dropdown Header */}
            <div className="mt-6 md:mt-[130px]">
              <button className="text-white text-[17px] md:text-[19px] font-medium flex items-center gap-1 group">
                Overview
                <svg
                  className="w-4 h-4 ml-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Nav Details Grid & Extra Links */}
            <div className="mt-5 md:mt-8 flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 md:gap-y-7 gap-x-6 md:gap-x-12 w-full md:w-auto px-0 md:px-10">
                {[
                  "Highlights",
                  "Cameras",
                  "Shared Features",
                  "Design",
                  "Performance",
                  "Accessories",
                ].map((item) => (
                  <div key={item}>
                    <Link
                      href="#"
                      className={`text-[14px] md:text-[15px] font-medium transition-colors ${
                        item === "Design"
                          ? "text-black bg-white rounded-full px-4 py-[5px] inline-block -ml-1.5"
                          : "text-white hover:text-[#2997ff]"
                      }`}
                    >
                      {item}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 items-start md:items-end w-full md:w-auto border-t border-white/10 md:border-t-0 pt-6 md:pt-1">
                <Link
                  href="#"
                  className="text-[#2997ff] hover:text-[#52aaff] text-[14px] md:text-[15px] font-medium flex items-center gap-1 transition-colors"
                >
                  Tech Specs <span className="text-[11px] font-bold">&gt;</span>
                </Link>
                <Link
                  href="#"
                  className="text-[#2997ff] hover:text-[#52aaff] text-[14px] md:text-[15px] font-medium flex items-center gap-1 transition-colors"
                >
                  Switch from Android{" "}
                  <span className="text-[11px] font-bold">&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
