"use client";

import LandingNav from "@/components/LandingNav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const spotlightImagesRef = useRef<HTMLDivElement>(null);
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const maskImgRef = useRef<HTMLDivElement>(null);
  const maskHeaderRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll
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

    if (!spotlightImages) return;

    // Calculate animation dimensions
    const spotlightContainerHeight = spotlightImages.offsetHeight;
    const viewportHeight = window.innerHeight;
    const initialOffset = spotlightContainerHeight * 0.05;
    const totalMovement =
      spotlightContainerHeight + initialOffset + viewportHeight;

    // Split text into words for word-by-word reveal
    const words: HTMLSpanElement[] = [];
    if (maskHeader) {
      const text = maskHeader.textContent || "";
      maskHeader.innerHTML = "";
      text.split(" ").forEach((word) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.style.opacity = "0";
        span.style.display = "inline-block";
        maskHeader.appendChild(span);
        words.push(span);
      });
    }

    // Main scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 7}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Phase 1: Image movement (0 to 50%)
        if (progress <= 0.5) {
          const imagesMoveProgress = progress / 0.5;
          const startY = 5;
          const endY = -(totalMovement / spotlightContainerHeight) * 100;
          const currentY = startY + (endY - startY) * imagesMoveProgress;
          gsap.set(spotlightImages, { y: `${currentY}%` });
        }

        // Phase 2: Mask reveal (25% to 75%)
        if (maskContainer && maskImage) {
          if (progress >= 0.25 && progress <= 0.75) {
            const maskProgress = (progress - 0.25) / 0.5;
            const maskSize = `${maskProgress * 450}%`;
            const imageScale = 1.5 - maskProgress * 0.5;

            maskContainer.style.setProperty("-webkit-mask-size", maskSize);
            maskContainer.style.setProperty("mask-size", maskSize);
            gsap.set(maskImage, { scale: imageScale });
          } else if (progress < 0.25) {
            maskContainer.style.setProperty("-webkit-mask-size", "0%");
            maskContainer.style.setProperty("mask-size", "0%");
            gsap.set(maskImage, { scale: 1.5 });
          } else if (progress > 0.75) {
            maskContainer.style.setProperty("-webkit-mask-size", "450%");
            maskContainer.style.setProperty("mask-size", "450%");
            gsap.set(maskImage, { scale: 1 });
          }
        }

        // Phase 3: Text reveal (75% to 95%)
        if (words.length > 0) {
          if (progress >= 0.75 && progress <= 0.95) {
            const textProgress = (progress - 0.75) / 0.2;
            const totalWords = words.length;
            words.forEach((word, index) => {
              const wordRevealProgress = index / totalWords;
              word.style.opacity =
                textProgress >= wordRevealProgress ? "1" : "0";
            });
          } else if (progress < 0.75) {
            words.forEach((w) => (w.style.opacity = "0"));
          } else if (progress > 0.95) {
            words.forEach((w) => (w.style.opacity = "1"));
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

  const images = [
    { row: 1, slots: [null, "/images/img1.jpg", null, "/images/img2.jpg"] },
    { row: 2, slots: ["/images/img3.jpg", null, null, null] },
    { row: 3, slots: [null, "/images/img4.jpg", "/images/img5.jpg", null] },
    { row: 4, slots: [null, "/images/img6.jpg", null, "/images/img7.jpg"] },
    { row: 5, slots: ["/images/img8.jpg", null, "/images/img9.jpg", null] },
  ];

  return (
    <main className="overflow-x-hidden bg-[#0a0a0a]">
      <LandingNav />

      {/* ===== INTRO ===== */}
      <section
        className="landing-section landing-intro"
        aria-label="Introduction"
      >
        <header className="landing-header">
          <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AnimeQuiz
          </h1>
          <p className="mt-6 text-lg text-zinc-400">
            Teste tes connaissances sur les openings, endings et soundtracks
          </p>
          <p className="mt-6 text-lg text-zinc-400">
            Il y aussi des quiz sur les films et séries
          </p>
          <div className="mt-8 animate-bounce text-zinc-600" aria-hidden="true">
            <svg
              className="mx-auto h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </header>
      </section>

      {/* ===== SPOTLIGHT ===== */}
      <section
        className="landing-section spotlight"
        aria-label="Animation spotlight"
      >
        <div className="landing-header" aria-hidden="true">
          <h2>Where Frames Fade Into Fate</h2>
        </div>

        <div
          className="spotlight-images"
          ref={spotlightImagesRef}
          role="presentation"
        >
          {images.map((row) => (
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
          </div>
        </div>
      </section>

      {/* ===== GAME MODES ===== */}
      <section
        className="relative min-h-screen bg-[#0a0a0a] px-6 py-32"
        aria-label="Modes de jeu"
      >
        <h2 className="mb-16 text-center text-4xl font-bold text-white">
          Choisis ton mode
        </h2>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <Link
            href="/quiz"
            aria-label="Jouer au mode Quiz"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-8 transition-all hover:scale-105 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span className="mb-4 block text-4xl" aria-hidden="true">
              🎵
            </span>
            <h3 className="mb-2 text-2xl font-bold text-white">Quiz</h3>
            <p className="text-sm text-zinc-400">
              15 questions, 10 secondes. Openings ou Endings d&apos;anime.
            </p>
            <span className="mt-4 block text-sm font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
              Jouer →
            </span>
          </Link>

          <Link
            href="/chill"
            aria-label="Jouer au mode Chill"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 transition-all hover:scale-105 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <span className="mb-4 block text-4xl" aria-hidden="true">
              🎧
            </span>
            <h3 className="mb-2 text-2xl font-bold text-white">Chill</h3>
            <p className="text-sm text-zinc-400">
              Anime, films, séries. Reconnais les soundtracks iconiques.
            </p>
            <span className="mt-4 block text-sm font-semibold text-purple-400 transition-colors group-hover:text-purple-300">
              Jouer →
            </span>
          </Link>

          <Link
            href="/training"
            aria-label="Accéder au mode Training"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 p-8 transition-all hover:scale-105 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <span className="mb-4 block text-4xl" aria-hidden="true">
              📚
            </span>
            <h3 className="mb-2 text-2xl font-bold text-white">Training</h3>
            <p className="text-sm text-zinc-400">
              Explore la base de données et entraîne-toi sur les openings.
            </p>
            <span className="mt-4 block text-sm font-semibold text-emerald-400 transition-colors group-hover:text-emerald-300">
              Explorer →
            </span>
          </Link>
        </div>
      </section>

      {/* ===== OUTRO ===== */}
      <footer className="landing-section landing-outro" aria-label="Footer">
        <h2 className="text-2xl font-bold text-zinc-600">Ready to play?</h2>
      </footer>
    </main>
  );
}
