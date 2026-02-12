"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const spotlightGrid = [
  { row: 1, slots: [null, "/images/img1.jpg", null, "/images/img2.jpg"] },
  { row: 2, slots: ["/images/img3.jpg", null, null, null] },
  { row: 3, slots: [null, "/images/img4.jpg", "/images/img5.jpg", null] },
  { row: 4, slots: [null, "/images/img6.jpg", null, "/images/img7.jpg"] },
  { row: 5, slots: ["/images/img8.jpg", null, "/images/img9.jpg", null] },
];

export default function SpotlightSection() {
  const spotlightImagesRef = useRef<HTMLDivElement>(null);
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const maskImgRef = useRef<HTMLDivElement>(null);
  const maskHeaderRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Respect reduced motion */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const spotlightImages = spotlightImagesRef.current;
    const maskContainer = maskContainerRef.current;
    const maskImage = maskImgRef.current;
    const maskHeader = maskHeaderRef.current;
    const cta = ctaRef.current;
    if (!spotlightImages) return;

    const containerH = spotlightImages.offsetHeight;
    const viewH = window.innerHeight;
    const totalMovement = containerH + containerH * 0.05 + viewH;

    /* Word-by-word reveal setup */
    const words: HTMLSpanElement[] = [];
    if (maskHeader) {
      const text = maskHeader.textContent || "";
      maskHeader.innerHTML = "";
      text.split(" ").forEach((word) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.marginRight = "0.3em";
        maskHeader.appendChild(span);
        words.push(span);
      });
    }

    const trigger = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${viewH * 7}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        /* Phase 1: Images scroll up (0→50%) */
        if (p <= 0.5) {
          const t = p / 0.5;
          const startY = 5;
          const endY = -(totalMovement / containerH) * 100;
          gsap.set(spotlightImages, {
            y: `${startY + (endY - startY) * t}%`,
          });
        }

        /* Phase 2: Mask reveal (25%→75%) */
        if (maskContainer && maskImage) {
          if (p >= 0.25 && p <= 0.75) {
            const mp = (p - 0.25) / 0.5;
            maskContainer.style.setProperty(
              "-webkit-mask-size",
              `${mp * 450}%`,
            );
            maskContainer.style.setProperty("mask-size", `${mp * 450}%`);
            gsap.set(maskImage, { scale: 1.5 - mp * 0.5 });
          } else if (p < 0.25) {
            maskContainer.style.setProperty("-webkit-mask-size", "0%");
            maskContainer.style.setProperty("mask-size", "0%");
            gsap.set(maskImage, { scale: 1.5 });
          } else {
            maskContainer.style.setProperty("-webkit-mask-size", "450%");
            maskContainer.style.setProperty("mask-size", "450%");
            gsap.set(maskImage, { scale: 1 });
          }
        }

        /* Phase 3: Text word-by-word (55%→80%) */
        if (words.length > 0) {
          if (p >= 0.55 && p <= 0.8) {
            const tp = (p - 0.55) / 0.25;
            words.forEach((w, i) => {
              w.style.opacity = tp >= i / words.length ? "1" : "0";
            });
          } else if (p < 0.55) {
            words.forEach((w) => (w.style.opacity = "0"));
          } else {
            words.forEach((w) => (w.style.opacity = "1"));
          }
        }

        /* Phase 4: CTA "Ready?" + button (80%→95%) */
        if (cta) {
          if (p >= 0.8 && p <= 0.95) {
            const cp = (p - 0.8) / 0.15;
            cta.style.opacity = String(cp);
            cta.style.pointerEvents = cp > 0.5 ? "auto" : "none";
          } else if (p < 0.8) {
            cta.style.opacity = "0";
            cta.style.pointerEvents = "none";
          } else {
            cta.style.opacity = "1";
            cta.style.pointerEvents = "auto";
          }
        }
      },
    });

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <section className="spotlight" aria-label="Animation spotlight">
      {/* Phase 1 header */}
      <div className="landing-header" aria-hidden="true">
        <h2>Where Frames Fade Into Fate</h2>
      </div>

      {/* Image grid */}
      <div
        className="spotlight-images"
        ref={spotlightImagesRef}
        role="presentation"
      >
        {spotlightGrid.map((row) => (
          <div key={row.row} className="spotlight-row">
            {row.slots.map((src, i) => (
              <div key={i} className="spotlight-img">
                {src && (
                  <Image
                    src={src}
                    alt=""
                    width={400}
                    height={560}
                    role="presentation"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mask reveal + CTA */}
      <div className="mask-container" ref={maskContainerRef}>
        <div className="mask-img" ref={maskImgRef}>
          <Image
            src="/images/spotlight-banner.jpg"
            alt="Anime spotlight banner"
            width={1920}
            height={1080}
            priority
          />
        </div>
        <div className="landing-header">
          <h2 ref={maskHeaderRef}>Trouve le titre avant la fin</h2>
          {/* CTA zone — fades in during Phase 4 */}
          <div ref={ctaRef} className="spotlight-cta" style={{ opacity: 0 }}>
            <p
              className="mb-6 font-display"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-300 bg-clip-text text-transparent">
                Ready?
              </span>
            </p>
            <Link
              href="/chill"
              className="clip-cyber inline-block bg-cyan-400 px-12 py-5 font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#07060b] transition-all duration-400 hover:-translate-y-1 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_60px_rgba(255,0,170,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              Lancer une partie
            </Link>
          </div>
        </div>
      </div>

      {/* Reduced-motion fallback: static version visible when GSAP is skipped */}
      <noscript>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#07060b]/80 text-center">
          <h2 className="mb-4 font-display text-3xl text-white md:text-5xl">
            Trouve le titre avant la fin
          </h2>
          <Link
            href="/chill"
            className="clip-cyber bg-cyan-400 px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#07060b]"
          >
            Lancer une partie
          </Link>
        </div>
      </noscript>
    </section>
  );
}
