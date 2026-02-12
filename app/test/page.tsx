"use client";

import LandingNav from "@/components/LandingNav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ═══ KANJI ═══ */
const KANJI = [
  "音",
  "楽",
  "曲",
  "歌",
  "響",
  "夢",
  "星",
  "光",
  "闇",
  "魂",
  "炎",
  "風",
  "雷",
  "剣",
  "龍",
  "桜",
  "月",
  "戦",
  "命",
  "力",
];

function FloatingKanji() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);
  const styles = useMemo(
    () =>
      KANJI.map((_, i) => {
        const s = (i + 1) * 7.31;
        const r = (n: number) => (((Math.sin(s + n) * 10000) % 1) + 1) % 1;
        return {
          left: `${r(0) * 100}%`,
          top: `${r(1) * 100}%`,
          animationDelay: `${r(2) * 20}s`,
          animationDuration: `${15 + r(3) * 25}s`,
          fontSize: `${1 + r(4) * 3}rem`,
        };
      }),
    [],
  );
  if (!mounted)
    return (
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" />
    );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {KANJI.map((k, i) => (
        <span
          key={i}
          className="absolute animate-kanji-float text-cyan-400/[0.04] select-none"
          style={styles[i]}
        >
          {k}
        </span>
      ))}
    </div>
  );
}

/* ═══ VHS ═══ */
function VhsOverlay() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[9999] mix-blend-multiply"
        style={{
          background:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.02] bg-repeat bg-[length:200px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}

function VhsBadges() {
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setTime(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":"),
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <div className="fixed top-4 left-5 z-[100] pointer-events-none font-mono text-[0.6rem] text-cyan-400/25 tracking-wider">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          REC
        </span>
        <div className="mt-0.5">{time}</div>
      </div>
      <div className="fixed bottom-4 right-5 z-[100] pointer-events-none font-mono text-[0.6rem] text-cyan-400/25 tracking-wider">
        PLAY ▶
      </div>
    </>
  );
}

/* ═══ GLITCH ═══ */
function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block glitch-text ${className}`}
      data-text={children}
    >
      {children}
    </span>
  );
}

/* ═══ COUNTER ═══ */
function AnimCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / 2000, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ═══ AUDIO VIZ ═══ */
function AudioViz({ color = "bg-cyan-400", bars = 24 }) {
  const s = useMemo(
    () =>
      Array.from({ length: bars }).map((_, i) => {
        const seed = (i + 1) * 3.17;
        const r = (((Math.sin(seed) * 10000) % 1) + 1) % 1;
        return { animationDelay: `${i * 0.05}s`, height: `${20 + r * 80}%` };
      }),
    [bars],
  );
  return (
    <div className="flex items-end gap-[2px] h-8">
      {s.map((st, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-sm ${color} opacity-60 animate-viz-bar`}
          style={st}
        />
      ))}
    </div>
  );
}

/* ═══ MODE CARD ═══ */
function ModeCard({
  href,
  emoji,
  title,
  description,
  cta,
  accentClass,
  glowClass,
  borderHoverClass,
  delay,
}: {
  href: string;
  emoji: string;
  title: string;
  description: string;
  cta: string;
  accentClass: string;
  glowClass: string;
  borderHoverClass: string;
  delay: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className="group relative block animate-card-reveal"
      style={{ animationDelay: delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute -inset-1 rounded-md opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40 ${glowClass}`}
      />
      <div
        className={`relative overflow-hidden rounded-md border border-white/[0.06] bg-[#0e0c14] p-7 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] ${borderHoverClass}`}
      >
        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-2xl transition-all group-hover:border-current group-hover:shadow-lg ${accentClass}`}
        >
          {emoji}
        </div>
        <h3 className="mb-2 font-display text-xl font-bold text-white">
          {title}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-zinc-500">
          {description}
        </p>
        <span
          className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300 group-hover:gap-3 ${accentClass}`}
        >
          {cta}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
        {hovered && (
          <div className="absolute bottom-0 left-0 right-0 h-7 px-6 opacity-25">
            <AudioViz
              bars={20}
              color={
                glowClass.includes("cyan")
                  ? "bg-cyan-400"
                  : glowClass.includes("pink")
                    ? "bg-pink-400"
                    : "bg-emerald-400"
              }
            />
          </div>
        )}
      </div>
    </Link>
  );
}

/* ═══ UNIVERSE CARD ═══ */
function UniverseCard({
  title,
  titleJp,
  description,
  imageSrc,
  accentColor,
  examples,
  index,
}: {
  title: string;
  titleJp: string;
  description: string;
  imageSrc: string;
  accentColor: string;
  examples: string[];
  index: number;
}) {
  return (
    <div
      className="group relative animate-card-reveal"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07060b] via-transparent to-transparent" />
        <div
          className="absolute top-3 left-3 rounded-sm px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em]"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          {titleJp}
        </div>
      </div>
      <h3 className="mb-2 font-display text-2xl text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-zinc-500">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {examples.map((ex) => (
          <span
            key={ex}
            className="rounded-sm border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[0.65rem] text-zinc-400 transition-colors hover:border-white/10 hover:text-zinc-300"
          >
            {ex}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ MARQUEE ═══ */
const MARQUEE_ITEMS = [
  "Naruto",
  "One Piece",
  "Attack on Titan",
  "Demon Slayer",
  "Interstellar",
  "Inception",
  "Jujutsu Kaisen",
  "Stranger Things",
  "Cowboy Bebop",
  "Breaking Bad",
  "Evangelion",
  "The Dark Knight",
  "Dragon Ball",
  "Game of Thrones",
  "Bleach",
  "Spirited Away",
  "Chainsaw Man",
  "The Witcher",
  "Hunter × Hunter",
  "Arcane",
];

function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/[0.03] bg-black/30 py-4">
      <div
        className="flex animate-marquee gap-12 whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
          <span
            key={i}
            className="font-display text-sm text-zinc-600 flex items-center gap-4"
          >
            {t}
            <span className="text-[0.5rem] text-cyan-400/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ FEATURE CELL ═══ */
function FeatureCell({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-[#07060b] p-8 transition-colors hover:bg-[#0e0c14]">
      <span className="mb-3 block text-2xl">{icon}</span>
      <h3 className="mb-2 font-display text-base text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-500">{desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ██  MAIN PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });

  // GSAP Spotlight refs
  const spotlightImagesRef = useRef<HTMLDivElement>(null);
  const maskContainerRef = useRef<HTMLDivElement>(null);
  const maskImgRef = useRef<HTMLDivElement>(null);
  const maskHeaderRef = useRef<HTMLHeadingElement>(null);

  // Font loading
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Noto+Sans+JP:wght@400;700&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 100);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // GSAP + Lenis smooth scroll + spotlight animation
  useEffect(() => {
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
    if (!spotlightImages) return;

    const containerH = spotlightImages.offsetHeight;
    const viewH = window.innerHeight;
    const totalMovement = containerH + containerH * 0.05 + viewH;

    // Word-by-word reveal setup
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

    const trigger = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${viewH * 7}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Phase 1: Images scroll up (0→50%)
        if (p <= 0.5) {
          const t = p / 0.5;
          const startY = 5;
          const endY = -(totalMovement / containerH) * 100;
          gsap.set(spotlightImages, { y: `${startY + (endY - startY) * t}%` });
        }

        // Phase 2: Mask reveal (25%→75%)
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

        // Phase 3: Text word-by-word (75%→95%)
        if (words.length > 0) {
          if (p >= 0.75 && p <= 0.95) {
            const tp = (p - 0.75) / 0.2;
            words.forEach((w, i) => {
              w.style.opacity = tp >= i / words.length ? "1" : "0";
            });
          } else if (p < 0.75) {
            words.forEach((w) => (w.style.opacity = "0"));
          } else {
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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const spotlightGrid = [
    { row: 1, slots: [null, "/images/img1.jpg", null, "/images/img2.jpg"] },
    { row: 2, slots: ["/images/img3.jpg", null, null, null] },
    { row: 3, slots: [null, "/images/img4.jpg", "/images/img5.jpg", null] },
    { row: 4, slots: [null, "/images/img6.jpg", null, "/images/img7.jpg"] },
    { row: 5, slots: ["/images/img8.jpg", null, "/images/img9.jpg", null] },
  ];

  return (
    <>
      {/* ── Custom CSS ── */}
      <style>{`
        @keyframes kanji-float { 0%{transform:translateY(100vh) rotate(0deg)} 100%{transform:translateY(-100vh) rotate(360deg)} }
        @keyframes viz-bar { 0%{transform:scaleY(0.3)} 100%{transform:scaleY(1)} }
        @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes card-reveal { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fade-slide-up { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glitch1 { 0%,90%,100%{transform:translate(0)} 92%{transform:translate(-3px,1px)} 94%{transform:translate(3px,-1px)} 96%{transform:translate(-2px,2px)} }
        @keyframes glitch2 { 0%,88%,100%{transform:translate(0)} 90%{transform:translate(3px,-2px)} 93%{transform:translate(-3px,1px)} 96%{transform:translate(2px,-1px)} }
        @keyframes scroll-pulse { 0%,100%{opacity:0.3;transform:scaleY(0.6)} 50%{opacity:1;transform:scaleY(1)} }

        .animate-kanji-float{animation:kanji-float linear infinite}
        .animate-viz-bar{animation:viz-bar .8s ease-in-out infinite alternate}
        .animate-marquee{animation:marquee-scroll 35s linear infinite}
        .animate-card-reveal{animation:card-reveal .6s both}
        .animate-fade-up{animation:fade-slide-up .8s both}
        .animate-scroll-pulse{animation:scroll-pulse 2s ease-in-out infinite}

        .font-display{font-family:'Dela Gothic One',cursive}
        .font-body{font-family:'Noto Sans JP',sans-serif}
        .font-mono{font-family:'Space Mono',monospace}

        .glitch-text::before,.glitch-text::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}
        .glitch-text::before{color:#00f0ff;animation:glitch1 3s infinite;clip-path:inset(0 0 65% 0)}
        .glitch-text::after{color:#ff00aa;animation:glitch2 3s infinite;clip-path:inset(65% 0 0 0)}
        .clip-cyber{clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))}

        /* ═══ SPOTLIGHT ═══ */
        .spotlight{position:relative;width:100%;height:100vh;overflow:hidden;background:#07060b}
        .spotlight .landing-header{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;text-align:center;width:90%;pointer-events:none}
        .spotlight .landing-header h2{font-family:'Dela Gothic One',cursive;font-size:clamp(2rem,5vw,4rem);color:#fff;text-shadow:0 0 60px rgba(0,240,255,0.3);line-height:1.15}
        .spotlight-images{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(5%);display:flex;flex-direction:column;gap:1rem;z-index:1;width:max-content}
        .spotlight-row{display:flex;gap:1rem;justify-content:center}
        .spotlight-img{width:clamp(140px,18vw,220px);aspect-ratio:5/7;border-radius:6px;overflow:hidden;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);flex-shrink:0}
        .spotlight-img img{width:100%;height:100%;object-fit:cover;display:block}
        .mask-container{position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='black'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='black'/%3E%3C/svg%3E");-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:0%;mask-size:0%}
        .mask-img{position:absolute;inset:0;z-index:1}
        .mask-img img{width:100%;height:100%;object-fit:cover;display:block}
        .mask-container .landing-header{z-index:4}
        .mask-container .landing-header h2 span{transition:opacity .15s ease}
      `}</style>

      <main
        className={`overflow-x-hidden bg-[#07060b] font-body text-zinc-100 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <VhsOverlay />
        <FloatingKanji />
        <VhsBadges />
        <LandingNav />

        {/* ═══ HERO ═══ */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,240,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.03) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%,black,transparent)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%,black,transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-[-10%] w-[120%] h-[120%] transition-[background] duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%,rgba(0,240,255,0.08) 0%,rgba(255,0,170,0.04) 30%,transparent 60%)`,
            }}
          />

          <div className="relative z-10 px-6 text-center">
            <p
              className="animate-fade-up mb-5 font-body text-sm tracking-[0.5em] text-cyan-400/50"
              style={{ animationDelay: "0.2s" }}
            >
              アニメクイズ — 音楽の試練
            </p>
            <h1
              className="animate-fade-up mb-6 font-display leading-[0.95]"
              style={{
                animationDelay: "0.4s",
                fontSize: "clamp(3.5rem,10vw,9rem)",
              }}
            >
              <GlitchText className="bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,240,255,0.2)]">
                AnimeQuiz
              </GlitchText>
            </h1>
            <p
              className="animate-fade-up mx-auto mb-10 max-w-lg font-mono text-sm leading-loose text-zinc-500"
              style={{ animationDelay: "0.6s" }}
            >
              Teste tes connaissances sur les{" "}
              <strong className="text-yellow-300 font-normal">openings</strong>,{" "}
              <strong className="text-yellow-300 font-normal">endings</strong>{" "}
              et{" "}
              <strong className="text-yellow-300 font-normal">
                soundtracks
              </strong>{" "}
              de tes animes, films et séries préférés.
            </p>
            <div
              className="animate-fade-up flex flex-wrap justify-center gap-4"
              style={{ animationDelay: "0.8s" }}
            >
              <Link
                href="/quiz"
                className="clip-cyber bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#07060b] transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.3)]"
              >
                Commencer
              </Link>
              <a
                href="#univers"
                className="clip-cyber border border-white/10 bg-transparent px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-zinc-400 transition-all hover:-translate-y-1 hover:border-pink-500 hover:text-pink-400 hover:shadow-[0_10px_40px_rgba(255,0,170,0.15)]"
              >
                Découvrir
              </a>
            </div>
          </div>
          <div
            className="animate-fade-up absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ animationDelay: "1.2s" }}
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-zinc-600">
              Scroll
            </span>
            <div className="animate-scroll-pulse h-10 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
          </div>
        </section>

        {/* ═══ SPOTLIGHT ═══ */}
        <section className="spotlight" aria-label="Animation spotlight">
          <div className="landing-header" aria-hidden="true">
            <h2>Where Frames Fade Into Fate</h2>
          </div>
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

        {/* ═══ MARQUEE ═══ */}
        <Marquee />

        {/* ═══ UNIVERS ═══ */}
        <section id="univers" className="relative z-10 px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <span className="mb-3 block font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-400">
                {"// Trois univers, une passion"}
              </span>
              <h2 className="font-display text-4xl text-white md:text-5xl">
                Anime · Films · Séries
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              <UniverseCard
                index={0}
                title="Anime"
                titleJp="アニメ"
                description="Des openings légendaires de Naruto aux endings mélancoliques de Clannad. Des centaines de titres de toutes les époques."
                imageSrc="/images/animequizz.jpg"
                accentColor="#00f0ff"
                examples={[
                  "Naruto",
                  "One Piece",
                  "AOT",
                  "Demon Slayer",
                  "Bleach",
                  "Evangelion",
                ]}
              />
              <UniverseCard
                index={1}
                title="Films"
                titleJp="映画"
                description="Les BO mythiques du cinéma : de Hans Zimmer à Joe Hisaishi. Reconnais la musique, trouve le film."
                imageSrc="/images/interstellaranimequizz.jpg"
                accentColor="#ff00aa"
                examples={[
                  "Interstellar",
                  "Inception",
                  "Star Wars",
                  "Spirited Away",
                  "The Dark Knight",
                ]}
              />
              <UniverseCard
                index={2}
                title="Séries"
                titleJp="ドラマ"
                description="De Stranger Things à Game of Thrones. Les thèmes qui restent en tête bien après le générique."
                imageSrc="/images/smallville.jpg"
                accentColor="#ffe100"
                examples={[
                  "Stranger Things",
                  "Breaking Bad",
                  "GOT",
                  "Arcane",
                  "The Witcher",
                ]}
              />
            </div>
          </div>
        </section>

        {/* ═══ MODES ═══ */}
        <section id="modes" className="relative z-10 px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <span className="mb-3 block font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-400">
                {"// Choisis ton arène"}
              </span>
              <h2 className="font-display text-4xl text-white md:text-5xl">
                Modes de jeu
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <ModeCard
                href="/quiz"
                emoji="🎵"
                title="Quiz"
                description="15 questions, 10 secondes par titre. Openings ou Endings — rapide et intense."
                cta="Jouer"
                accentClass="text-cyan-400"
                glowClass="bg-gradient-to-r from-cyan-400/30 to-blue-500/30"
                borderHoverClass="group-hover:border-cyan-400/30"
                delay="0s"
              />
              <ModeCard
                href="/chill"
                emoji="🎧"
                title="Chill"
                description="Reconnais les soundtracks iconiques de tous les univers. Sans timer, sans pression."
                cta="Jouer"
                accentClass="text-pink-400"
                glowClass="bg-gradient-to-r from-pink-500/30 to-purple-500/30"
                borderHoverClass="group-hover:border-pink-400/30"
                delay="0.1s"
              />
              <ModeCard
                href="/training"
                emoji="📚"
                title="Training"
                description="Explore la base complète et entraîne-toi à ton rythme sur n'importe quel titre."
                cta="Explorer"
                accentClass="text-emerald-400"
                glowClass="bg-gradient-to-r from-emerald-400/30 to-teal-400/30"
                borderHoverClass="group-hover:border-emerald-400/30"
                delay="0.2s"
              />
            </div>
          </div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="relative z-10 border-y border-white/[0.03] px-6 py-20">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { target: 500, suffix: "+", label: "Titres" },
              { target: 150, suffix: "+", label: "Animes" },
              { target: 80, suffix: "+", label: "Films & Séries" },
              { target: 10, suffix: "s", label: "Par question" },
            ].map((s) => (
              <div key={s.label} className="py-4">
                <span className="block font-display text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  <AnimCounter target={s.target} suffix={s.suffix} />
                </span>
                <span className="mt-2 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="relative z-10 px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <span className="mb-3 block font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-400">
                {"// Comment ça marche"}
              </span>
              <h2 className="font-display text-4xl text-white md:text-5xl">
                Simple et addictif
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  icon: "🎯",
                  title: "Choisis",
                  desc: "Anime, film ou série. Quiz rapide ou mode chill.",
                },
                {
                  step: "02",
                  icon: "🎵",
                  title: "Écoute",
                  desc: "Un extrait se lance. Opening, ending ou soundtrack.",
                },
                {
                  step: "03",
                  icon: "💡",
                  title: "Devine",
                  desc: "Trouve le bon titre avant la fin du timer.",
                },
                {
                  step: "04",
                  icon: "🏆",
                  title: "Progresse",
                  desc: "Cumule des points et grimpe dans le classement.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="group relative border border-white/[0.04] bg-[#0e0c14] p-6 transition-colors hover:border-white/10"
                >
                  <span className="absolute -top-3 left-4 bg-[#07060b] px-2 font-mono text-[0.6rem] tracking-[0.3em] text-cyan-400/50">
                    {s.step}
                  </span>
                  <span className="mb-3 block text-2xl">{s.icon}</span>
                  <h3 className="mb-1.5 font-display text-base text-white">
                    {s.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-500">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section className="relative z-10 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <span className="mb-3 block font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-400">
                {"// Ce qui t'attend"}
              </span>
              <h2 className="font-display text-3xl text-white">
                Fonctionnalités
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-px bg-white/[0.04] md:grid-cols-2">
              <FeatureCell
                icon="⚡"
                title="Gameplay rapide"
                desc="10 secondes pour reconnaître le titre. Chaque milliseconde compte."
              />
              <FeatureCell
                icon="🎼"
                title="3 univers musicaux"
                desc="Anime, films et séries TV. Des centaines de soundtracks à découvrir."
              />
              <FeatureCell
                icon="🎮"
                title="Multiples modes"
                desc="Quiz chronométré, mode chill sans pression, ou entraînement libre."
              />
              <FeatureCell
                icon="📊"
                title="Suivi & progression"
                desc="Stats détaillées, historique et amélioration continue."
              />
            </div>
          </div>
        </section>

        {/* ═══ CTA BANNER ═══ */}
        <section className="relative z-10 px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <div className="group relative overflow-hidden rounded-md border border-white/[0.06]">
              <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
                <Image
                  src="/images/panorama.jpg"
                  alt="Mosaïque de scènes iconiques"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 1200px"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#07060b] via-[#07060b]/60 to-transparent p-8 text-center">
                <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.4em] text-cyan-400/60">
                  Prêt à tester tes oreilles ?
                </p>
                <h2 className="mb-6 font-display text-3xl text-white md:text-5xl">
                  Trouve le titre{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                    avant la fin
                  </span>
                </h2>
                <Link
                  href="/quiz"
                  className="clip-cyber bg-gradient-to-r from-cyan-400 to-blue-500 px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#07060b] transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,240,255,0.3)]"
                >
                  Lancer une partie
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="relative z-10 border-t border-white/[0.03] px-6 py-16 text-center">
          <h2
            className="mb-8 font-display"
            style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-300 bg-clip-text text-transparent">
              Ready?
            </span>
          </h2>
          <Link
            href="/quiz"
            className="clip-cyber mb-10 inline-block bg-cyan-400 px-12 py-5 font-mono text-sm font-bold uppercase tracking-[0.2em] text-[#07060b] transition-all hover:-translate-y-1 hover:bg-pink-500 hover:text-white hover:shadow-[0_0_60px_rgba(255,0,170,0.3)]"
          >
            Lancer une partie
          </Link>
          <p className="mt-10 font-mono text-[0.6rem] tracking-[0.1em] text-zinc-600">
            AnimeQuiz — 2025 — Fait avec passion et nostalgie
          </p>
        </footer>
      </main>
    </>
  );
}
