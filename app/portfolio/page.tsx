
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Noise overlay for surreal Junji Ito atmosphere
function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.18]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay",
      }}
    />
  );
}

// Portfolio section card component
interface PortfolioCardProps {
  title: string;
  description: string;
  route: string;
  index: number;
}

function PortfolioCard({ title, description, route, index }: PortfolioCardProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative p-8 rounded-lg manga-border bg-black/70 backdrop-blur-sm cursor-pointer group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => router.push(route)}
      whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background ink splatter on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03), transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl font-serif scratchy-text mb-4"
          animate={hovered ? { x: [0, 2, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h2>

        <p className="text-white/75 leading-relaxed mb-6 text-base">
          {description}
        </p>

        <motion.div
          className="flex items-center text-sm text-white/60 group-hover:text-white/90 transition-colors"
          animate={hovered ? { x: [0, 4, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <span>Enter →</span>
        </motion.div>
      </div>

      {/* Breathing border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={hovered ? {
          boxShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 20px rgba(255,255,255,0.2)",
            "0 0 0px rgba(255,255,255,0)"
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

export default function PortfolioHub() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  // Set window size on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax based on mouse
  const parallaxX = useTransform(mouseX, [0, windowSize.width], [-5, 5]);
  const parallaxY = useTransform(mouseY, [0, windowSize.height], [-3, 3]);

  // Placeholder mode: Coming Soon message instead of interactive sections

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Noise overlay */}
      <NoiseOverlay />

      {/* Fog vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Grain animated background */}
      <div className="fixed inset-0 z-0 manga-grain" />

      {/* Corridor background: narrow 3D tunnel of eyes */}
      <div
        className="absolute inset-0 z-10"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Left wall */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 h-[140vh] w-[160px]"
            style={{
              transform: "translateZ(-400px) rotateY(25deg)",
              transformOrigin: "left center",
              background: "linear-gradient(90deg,#000, #0d0d0d 60%, rgba(0,0,0,0))",
              boxShadow: "inset -25px 0 40px rgba(0,0,0,0.9)",
            }}
          >
            <EyeGrid side="left" />
          </div>
          {/* Right wall */}
          <div
            className="absolute top-1/2 -translate-y-1/2 right-0 h-[140vh] w-[160px]"
            style={{
              transform: "translateZ(-400px) rotateY(-25deg)",
              transformOrigin: "right center",
              background: "linear-gradient(-90deg,#000, #0d0d0d 60%, rgba(0,0,0,0))",
              boxShadow: "inset 25px 0 40px rgba(0,0,0,0.9)",
            }}
          >
            <EyeGrid side="right" />
          </div>
          {/* Floor */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[900px] h-[140vh]"
            style={{
              transform: "translateZ(-450px) rotateX(78deg)",
              backgroundImage: "repeating-linear-gradient(90deg,#000 0 40px,#090909 40px 80px)",
              opacity: 0.85,
              boxShadow: "0 0 140px rgba(255,255,255,0.08), inset 0 -120px 160px rgba(0,0,0,0.9)",
              filter: "contrast(115%) brightness(95%)",
            }}
          />
          {/* Ceiling */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[900px] h-[120vh]"
            style={{
              transform: "translateZ(-450px) rotateX(-82deg)",
              background: "linear-gradient(180deg,#000,#111 70%,transparent)",
              opacity: 0.8,
            }}
          />
        </div>
      </div>

      {/* Floating ink accent */}
      <motion.div
        className="fixed top-20 right-[10%] w-32 h-32 rounded-full pointer-events-none z-10 opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 65%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content container vertically centered */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 py-10"
        style={{ x: parallaxX, y: parallaxY }}
      >
        {/* Header */}
        <motion.header
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-7xl font-serif mb-6 scratchy-text"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 30px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Portfolio
          </motion.h1>
          
          <motion.p
            className="text-white/70 text-base max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            A narrow passage lined with silent witnesses. Your arrival has been noticed.
          </motion.p>
        </motion.header>

        {/* Coming Soon Placeholder (enhanced technical aesthetic) */}
        <motion.div
          className="mx-auto mb-12 w-full max-w-3xl text-center p-10 rounded-lg manga-border bg-black/75 backdrop-blur-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          {/* Animated ambient gradient pulse */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.05), transparent 70%)",
              mixBlendMode: "screen"
            }}
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Scan-line overlay */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)" , backgroundSize: "100% 3px"}}
            animate={{ opacity: [0.08, 0.14, 0.08] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          {/* Corner circuit accents */}
          <div className="absolute -top-px left-0 h-16 w-16 opacity-40">
            <svg viewBox="0 0 64 64" className="w-full h-full" stroke="white" strokeWidth="1" fill="none">
              <path d="M2 2h40v20h20v40H42V42H22V22H2z" vectorEffect="non-scaling-stroke" />
              <circle cx="22" cy="22" r="3" />
              <circle cx="42" cy="42" r="3" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 h-16 w-16 opacity-30 rotate-180">
            <svg viewBox="0 0 64 64" className="w-full h-full" stroke="white" strokeWidth="1" fill="none">
              <path d="M2 2h40v20h20v40H42V42H22V22H2z" vectorEffect="non-scaling-stroke" />
              <circle cx="22" cy="22" r="3" />
              <circle cx="42" cy="42" r="3" />
            </svg>
          </div>
          <motion.h2
            className="text-4xl sm:text-5xl font-serif scratchy-text mb-6 relative"
            animate={{ scale: [1, 1.012, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Coming Soon
          </motion.h2>
          <motion.p
            className="text-white/70 leading-relaxed text-lg max-w-xl mx-auto"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            The interactive hub is being assembled. Soon: modular project index, influence matrix, and evolving roadmap. Meanwhile—this chamber calibrates.
          </motion.p>
          {/* Meta status rows */}
          <div className="mt-8 space-y-2 font-mono text-xs tracking-wide">
            <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 5, repeat: Infinity }}>STATUS: SYNTHESIZING MODULES…</motion.div>
            <motion.div animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 7, repeat: Infinity }}>QUEUE: [ PROJECTS | INSPIRATIONS | UPCOMING ]</motion.div>
            <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 9, repeat: Infinity }}>CHANNEL: LIMINAL_RENDER_PIPE</motion.div>
          </div>
          {/* Progress bar */}
          <motion.div
            className="mt-6 w-64 h-2 mx-auto rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-white via-white/80 to-white/40"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              style={{ width: "50%" }}
            />
          </motion.div>
          {/* Contact CTA */}
          <motion.div className="mt-10">
            <motion.a
              href="mailto:lazzaradani@gmail.com"
              aria-label="Contact Danielle via Email"
              className="relative inline-flex items-center justify-center px-8 py-4 rounded-full font-mono text-sm tracking-wider overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/40 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Pulsing outer aura */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
                  filter: "blur(18px)",
                }}
              />
              {/* Glowing border */}
              <motion.span
                className="absolute inset-0 rounded-full border border-white/30"
                animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0.2)", "0 0 18px rgba(255,255,255,0.55)", "0 0 0px rgba(255,255,255,0.2)"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10 text-white">CONTACT • LAZZARADANI@GMAIL.COM</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Back to home link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm scratchy-text"
          >
            ← Return to Portal
          </a>
        </motion.div>
      </motion.div>

      {/* Remove previous floating decorative element for cleaner corridor focus */}
    </main>
  );
}

// Simplified eye grid for corridor walls
function EyeGrid({ side }: { side: "left" | "right" }) {
  const rows = 8;
  const cols = 3;
  const eyes: React.ReactElement[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const delay = (r * 0.25 + c * 0.15);
      eyes.push(
        <motion.div
          key={`${side}-${r}-${c}`}
          className="relative"
          style={{ width: 50, height: 34 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.55, 0.75, 0.55], scale: 1 }}
          transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #d9d9d9 35%, #111 80%)",
              boxShadow: "0 0 12px rgba(255,255,255,0.25), inset 0 2px 6px rgba(0,0,0,0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 18,
                height: 18,
                transform: "translate(-50%,-50%)",
                background: "radial-gradient(circle,#000 0%, #222 70%)",
                borderRadius: "50%",
                boxShadow: "0 0 6px rgba(0,0,0,0.8)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "32%",
                top: "28%",
                width: 6,
                height: 6,
                background: "rgba(255,255,255,0.9)",
                borderRadius: "50%",
                filter: "blur(0.5px)",
              }}
            />
          </div>
        </motion.div>
      );
    }
  }
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${cols},1fr)`, gap: 22, padding: 28 }}>
      {eyes}
    </div>
  );
}

