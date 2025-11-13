// Refer to .copilot-style.md aesthetic
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isWormholeActive, setIsWormholeActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnterPortal = () => {
    setIsWormholeActive(true);
    setTimeout(() => {
      router.push("/portfolio");
    }, 5000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Bioluminescent glowing orbs background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large cyan glow - top left */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
            top: "10%",
            left: "15%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.14, 0.26, 0.14],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Large magenta glow - bottom right */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full blur-[130px] opacity-18"
          style={{
            background: "radial-gradient(circle, #ff00ff 0%, transparent 70%)",
            bottom: "5%",
            right: "10%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.12, 0.24, 0.12],
            x: [0, -40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Medium lime green glow - center */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-10"
          style={{
            background: "radial-gradient(circle, #39ff14 0%, transparent 70%)",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.14, 0.08],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Small cyan accent - top right */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[90px] opacity-20"
          style={{
            background: "radial-gradient(circle, #00ffff 0%, transparent 70%)",
            top: "20%",
            right: "20%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.16, 0.26, 0.16],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Small magenta accent - bottom left */}
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full blur-[110px] opacity-14"
          style={{
            background: "radial-gradient(circle, #ff00ff 0%, transparent 70%)",
            bottom: "15%",
            left: "12%",
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.11, 0.18, 0.11],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Soft blue glow - mid right */}
        <motion.div
          className="absolute w-[550px] h-[550px] rounded-full blur-[110px] opacity-18"
          style={{
            background: "radial-gradient(circle, #4dd0e1 0%, transparent 70%)",
            top: "50%",
            right: "15%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.22, 0.12],
            x: [0, -60, -25],
            y: [0, 30, 15],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Lime green accent - top center */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[95px] opacity-12"
          style={{
            background: "radial-gradient(circle, #39ff14 0%, transparent 70%)",
            top: "5%",
            left: "45%",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.09, 0.16, 0.09],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Soft blue accent - bottom center */}
        <motion.div
          className="absolute w-[480px] h-[480px] rounded-full blur-[105px] opacity-17"
          style={{
            background: "radial-gradient(circle, #80deea 0%, transparent 70%)",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.13, 0.23, 0.13],
            x: [-50, -80, -50],
            y: [0, 20, 10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Lime green accent - mid left */}
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full blur-[100px] opacity-11"
          style={{
            background: "radial-gradient(circle, #39ff14 0%, transparent 70%)",
            top: "35%",
            left: "8%",
          }}
          animate={{
            scale: [1, 1.22, 1],
            opacity: [0.09, 0.14, 0.09],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 9.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Soft blue accent - upper left */}
        <motion.div
          className="absolute w-[380px] h-[380px] rounded-full blur-[95px] opacity-20"
          style={{
            background: "radial-gradient(circle, #26c6da 0%, transparent 70%)",
            top: "15%",
            left: "30%",
          }}
          animate={{
            scale: [1, 1.16, 1],
            opacity: [0.16, 0.26, 0.16],
            x: [0, -45, -18],
            y: [0, 30, 12],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Deep blue accent - lower right */}
        <motion.div
          className="absolute w-[460px] h-[460px] rounded-full blur-[108px] opacity-19"
          style={{
            background: "radial-gradient(circle, #00acc1 0%, transparent 70%)",
            bottom: "25%",
            right: "25%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 55, 22],
            y: [0, -35, -15],
          }}
          transition={{
            duration: 10.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Subtle red accent - center right */}
        <motion.div
          className="absolute w-[340px] h-[340px] rounded-full blur-[88px] opacity-12"
          style={{
            background: "radial-gradient(circle, #ff1744 0%, transparent 70%)",
            top: "45%",
            right: "35%",
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.09, 0.16, 0.09],
            x: [0, -12, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Light blue accent - upper right */}
        <motion.div
          className="absolute w-[390px] h-[390px] rounded-full blur-[98px] opacity-19"
          style={{
            background: "radial-gradient(circle, #b3e5fc 0%, transparent 70%)",
            top: "8%",
            right: "38%",
          }}
          animate={{
            scale: [1, 1.14, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 40, 16],
            y: [0, 35, 16],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Coral red accent - bottom left corner */}
        <motion.div
          className="absolute w-[360px] h-[360px] rounded-full blur-[92px] opacity-14"
          style={{
            background: "radial-gradient(circle, #ff5252 0%, transparent 70%)",
            bottom: "8%",
            left: "5%",
          }}
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.11, 0.18, 0.11],
            x: [0, 14, 0],
          }}
          transition={{
            duration: 10.2,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Additional soft blue - mid center */}
        <motion.div
          className="absolute w-[520px] h-[520px] rounded-full blur-[112px] opacity-17"
          style={{
            background: "radial-gradient(circle, #4fc3f7 0%, transparent 70%)",
            top: "28%",
            left: "40%",
          }}
          animate={{
            scale: [1, 1.17, 1],
            opacity: [0.13, 0.23, 0.13],
            x: [0, -50, -20],
            y: [0, 40, 18],
          }}
          transition={{
            duration: 11.5,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />

        {/* Aqua blue accent - right side */}
        <motion.div
          className="absolute w-[440px] h-[440px] rounded-full blur-[102px] opacity-18"
          style={{
            background: "radial-gradient(circle, #18ffff 0%, transparent 70%)",
            top: "60%",
            right: "5%",
          }}
          animate={{
            scale: [1, 1.19, 1],
            opacity: [0.14, 0.24, 0.14],
            x: [0, -48, 0],
            y: [0, -50, -22],
          }}
          transition={{
            duration: 9.8,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>

      {/* Animated background particles - Lottie-style */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(75)].map((_, i) => {
            const colors = ["#00ffff", "#4dd0e1", "#80deea", "#26c6da", "#00acc1", "#b3e5fc", "#4fc3f7", "#18ffff", "#00bcd4", "#39ff14", "#7cfc00", "#ff1744", "#ff5252"];
            const color = colors[i % 13];
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const size = 1 + Math.random() * 2;
            const glowSize = 10 + Math.random() * 30;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle, ${color}, transparent)`,
                  left: `${startX}%`,
                  top: `${startY}%`,
                  boxShadow: `0 0 ${glowSize}px ${color}`,
                }}
                animate={{
                  x: [
                    0,
                    Math.random() * 200 - 100,
                    Math.random() * 200 - 100,
                    Math.random() * 200 - 100,
                    0
                  ],
                  y: [
                    0,
                    Math.random() * 200 - 100,
                    Math.random() * 200 - 100,
                    Math.random() * 200 - 100,
                    0
                  ],
                  opacity: [0, 0.4, 0.6, 0.4, 0],
                  scale: [0, 1.2, 1.6, 1.2, 0],
                }}
                transition={{
                  duration: 6 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 8,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            );
          })}
        </div>
      )}

      {/* Floating energy trails */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(14)].map((_, i) => {
            const colors = ["#00ffff", "#4dd0e1", "#80deea", "#26c6da", "#00acc1", "#b3e5fc", "#4fc3f7", "#18ffff", "#00bcd4", "#39ff14", "#ff1744"];
            const color = colors[i % 11];
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            
            return (
              <motion.div
                key={`trail-${i}`}
                className="absolute"
                style={{
                  left: `${startX}%`,
                  top: `${startY}%`,
                }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${color}40, transparent 70%)`,
                  }}
                  animate={{
                    x: [
                      0,
                      Math.random() * 400 - 200,
                      Math.random() * 400 - 200,
                      0
                    ],
                    y: [
                      0,
                      Math.random() * 400 - 200,
                      Math.random() * 400 - 200,
                      0
                    ],
                    scale: [0.5, 1.5, 1, 0.5],
                    opacity: [0.15, 0.35, 0.22, 0.15],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 8,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Parallax fog layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(77, 208, 225, 0.12), transparent 50%)`,
        }}
        animate={{
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 25%, #ff8c00 50%, #39ff14 75%, #8b00ff 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 30px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 60px rgba(255, 0, 255, 0.4))",
          }}
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 25%, #ff8c00 50%, #39ff14 75%, #8b00ff 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Danielle Lazzara
          </motion.span>
          {/* Chromatic aberration effect */}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 25%, #ff8c00 50%, #39ff14 75%, #8b00ff 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transform: "translate(2px, 0)",
              opacity: 0.3,
              mixBlendMode: "screen",
            }}
          >
            Danielle Lazzara
          </span>
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #ff00ff 0%, #ff8c00 25%, #39ff14 50%, #8b00ff 75%, #00ffff 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transform: "translate(-2px, 0)",
              opacity: 0.3,
              mixBlendMode: "screen",
            }}
          >
            Danielle Lazzara
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            background: "linear-gradient(90deg, #00ffff 0%, #ff69b4 50%, #39ff14 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(0, 255, 255, 0.8)",
            filter: "drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))",
          }}
        >
          creator of experiences that glow between logic and magic
        </motion.p>

        <motion.button
          className="px-8 py-4 rounded-full text-white font-semibold text-lg relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnterPortal}
          style={{
            background: "linear-gradient(135deg, #00ffff, #ff00ff, #ff8c00, #39ff14)",
            backgroundSize: "300% 300%",
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(135deg, #00ffff, #ff00ff, #ff8c00, #39ff14)",
              backgroundSize: "300% 300%",
            }}
          />
          <span className="relative z-10">Enter My Portfolio</span>
          {/* Chromatic aberration on button */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #ff00ff, #ff8c00, #39ff14, #00ffff)",
              transform: "translate(1px, 0)",
              opacity: 0.3,
              mixBlendMode: "screen",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.button>
      </div>

      {/* Wormhole transition overlay */}
      {isWormholeActive && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Central vortex with iridescent gradient */}
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #00ffff, #ff00ff, #ff8c00, #39ff14, #8b00ff, #00ffff)",
              filter: "blur(40px)",
            }}
            animate={{
              scale: [1, 100],
              rotate: [0, 720],
            }}
            transition={{
              duration: 5,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* Chromatic aberration layers for vortex */}
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: "conic-gradient(from 120deg, #ff00ff, #ff8c00, #39ff14, #8b00ff, #00ffff, #ff00ff)",
              filter: "blur(45px)",
              opacity: 0.6,
              mixBlendMode: "screen",
            }}
            animate={{
              scale: [1, 100],
              rotate: [0, -720],
            }}
            transition={{
              duration: 5,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* Spiraling rings with oil-slick gradients */}
          {[...Array(12)].map((_, i) => {
            const hueRotation = (i / 12) * 360;
            return (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full border-2"
                style={{
                  width: `${100 + i * 80}px`,
                  height: `${100 + i * 80}px`,
                  borderImage: `conic-gradient(from ${hueRotation}deg, #00ffff, #ff00ff, #ff8c00, #39ff14, #8b00ff, #00ffff) 1`,
                  opacity: 0.7,
                  boxShadow: `0 0 20px ${i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff00ff" : "#ff8c00"}`,
                }}
                animate={{
                  scale: [1, 20],
                  rotate: [0, i % 2 === 0 ? 1080 : -1080],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 5,
                  delay: i * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            );
          })}

          {/* Energy particles rushing inward with rainbow trails */}
          {[...Array(40)].map((_, i) => {
            const angle = (i / 40) * Math.PI * 2;
            const distance = 600;
            const startX = Math.cos(angle) * distance;
            const startY = Math.sin(angle) * distance;
            const colors = ["#00ffff", "#ff00ff", "#ff8c00", "#39ff14", "#8b00ff"];
            const color = colors[i % 5];

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${color}, transparent)`,
                  boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
                  left: "50%",
                  top: "50%",
                }}
                initial={{
                  x: startX,
                  y: startY,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  opacity: [1, 1, 0],
                  scale: [1, 2, 0],
                }}
                transition={{
                  duration: 5,
                  delay: (i / 40) * 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            );
          })}

          {/* Radial light bursts with iridescent gradients */}
          {[...Array(8)].map((_, i) => {
            const rotation = (i / 8) * 360;
            return (
              <motion.div
                key={`burst-${i}`}
                className="absolute w-full h-2"
                style={{
                  background: `linear-gradient(90deg, transparent, ${i % 5 === 0 ? "#00ffff" : i % 5 === 1 ? "#ff00ff" : i % 5 === 2 ? "#ff8c00" : i % 5 === 3 ? "#39ff14" : "#8b00ff"}, transparent)`,
                  transformOrigin: "center",
                  rotate: `${rotation}deg`,
                  filter: "blur(3px)",
                  boxShadow: `0 0 30px ${i % 5 === 0 ? "#00ffff" : i % 5 === 1 ? "#ff00ff" : i % 5 === 2 ? "#ff8c00" : i % 5 === 3 ? "#39ff14" : "#8b00ff"}`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0, 2, 0],
                }}
                transition={{
                  duration: 5,
                  delay: i * 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            );
          })}

          {/* Full screen flash with chromatic aberration */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(45deg, #00ffff, #ff00ff, #ff8c00, #39ff14)",
            }}
            animate={{
              opacity: [0, 0, 0, 0, 0.3, 1],
            }}
            transition={{
              duration: 5,
              times: [0, 0.7, 0.85, 0.92, 0.96, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
          />
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{
              opacity: [0, 0, 0, 0, 0.5, 1],
            }}
            transition={{
              duration: 5,
              times: [0, 0.75, 0.88, 0.94, 0.98, 1],
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        </motion.div>
      )}
    </main>
  );
}
