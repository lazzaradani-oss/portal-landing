
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Noise overlay for surreal atmosphere
function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.12]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: "overlay",
      }}
    />
  );
}

// Fog/Atmospheric depth effect
function FogOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-30"
      style={{
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    />
  );
}
// Eye component for walls - simplified and clean
interface WallEyeProps {
  position: "left" | "right";
  yPosition: number;
  zPosition: number;
  onClick?: () => void;
}

function WallEye({ position, yPosition, zPosition, onClick }: WallEyeProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  // Track mouse for pupil movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 150, 1);
      
      setPupilPos({
        x: Math.cos(angle) * distance * 10,
        y: Math.sin(angle) * distance * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  const scale = 1 - (zPosition / 3000);
  const opacity = Math.max(0.6, 1 - (zPosition / 2500));

  return (
    <motion.div
      ref={eyeRef}
      className="absolute cursor-pointer"
      style={{
        [position]: position === "left" ? "5%" : "5%",
        top: `${yPosition}%`,
        transform: `translateZ(${-zPosition}px) scale(${scale})`,
        opacity: opacity,
      }}
      onClick={onClick}
      whileHover={{ scale: scale * 1.1 }}
    >
      <motion.div
        className="relative w-24 h-16 bg-white rounded-full border-3 border-gray-800 overflow-hidden"
        style={{
          boxShadow: "0 0 25px rgba(255,255,255,0.6), inset 0 2px 8px rgba(0,0,0,0.3)",
        }}
        animate={{
          scaleY: isBlinking ? 0.1 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Iris - Blue */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-11 h-11 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle at 35% 35%, #4dd0e1 0%, #00acc1 25%, #0277bd 60%, #01579b 100%)",
            boxShadow: "0 0 12px rgba(77, 208, 225, 0.5), inset 0 -2px 6px rgba(0,0,0,0.4)",
          }}
          animate={{
            x: pupilPos.x,
            y: pupilPos.y,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Pupil */}
          <div className="absolute left-1/2 top-1/2 w-5 h-5 bg-black rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              boxShadow: "0 0 8px rgba(0,0,0,0.8)",
            }}
          />
          
          {/* Highlight */}
          <motion.div
            className="absolute left-[28%] top-[22%] w-2.5 h-2.5 rounded-full bg-white"
            style={{
              boxShadow: "0 0 4px rgba(255,255,255,0.8)",
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          {/* Secondary highlight */}
          <div 
            className="absolute left-[60%] top-[50%] w-1.5 h-1.5 rounded-full bg-white opacity-40"
          />
        </motion.div>

        {/* Blue veins */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute h-px bg-cyan-900 opacity-20"
              style={{
                top: `${35 + i * 12}%`,
                left: "15%",
                right: "15%",
                transform: `rotate(${-8 + i * 8}deg)`,
                boxShadow: "0 0 2px rgba(0, 172, 193, 0.3)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HallOfObservation() {
  const [scroll, setScroll] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  const [rippleScale, setRippleScale] = useState(0);
  const [rippleFreq, setRippleFreq] = useState(0.006);
  const [rippleEnabled, setRippleEnabled] = useState(true);

  // Set window size on mount
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Increase ripple intensity as the cursor approaches the floor
      const ny = e.clientY / window.innerHeight; // 0 (top) -> 1 (bottom)
      const nearFloor = Math.max(0, Math.min(1, (ny - 0.4) / 0.6));
      const intensity = nearFloor; // linear mapping for subtle effect
      setRippleScale(5 + intensity * 20); // 5..25
      setRippleFreq(0.004 + intensity * 0.008); // 0.004..0.012
    };

    const handleWheel = (e: WheelEvent) => {
      setScroll((prev) => Math.max(0, Math.min(100, prev + e.deltaY * 0.03)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [mouseX, mouseY]);

  // Parallax based on mouse
  const parallaxX = useTransform(mouseX, [0, windowSize.width], [-15, 15]);
  const parallaxY = useTransform(mouseY, [0, windowSize.height], [-8, 8]);
  const smoothParallaxX = useSpring(parallaxX, { stiffness: 50, damping: 20 });
  const smoothParallaxY = useSpring(parallaxY, { stiffness: 50, damping: 20 });

  // Perspective based on scroll
  const perspective = 1200 + scroll * 10;
  
  // Subtle liquid-like warp via background shift
  const floorBgPosX = useTransform(mouseX, [0, windowSize.width], [-6, 6]);
  const floorBgPosY = useTransform(mouseY, [0, windowSize.height], [-3, 3]);
  const floorBgPos = useTransform([floorBgPosX, floorBgPosY], (v: number[]) => `${50 + v[0]}% ${50 + v[1]}%`);
  const floorBgSize = useTransform(mouseY, [0, windowSize.height], ["100px 100px", "108px 108px"]);
  
  // Generate eye positions for infinite corridor effect
  const generateEyePositions = (side: "left" | "right") => {
    const eyes = [];
    for (let z = 0; z < 2500; z += 150) {
      for (let y = 10; y < 90; y += 20) {
        eyes.push({ y, z, side });
      }
    }
    return eyes;
  };

  const leftEyes = generateEyePositions("left");
  const rightEyes = generateEyePositions("right");

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Noise overlay */}
      <NoiseOverlay />
      {/* Fog/Atmosphere */}
      <FogOverlay />

      {/* 3D Corridor Container */}
      <div
        className="fixed inset-0"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: "center center",
        }}
      >
        {/* Hallway with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(${-scroll * 15}px)`,
            x: smoothParallaxX,
            y: smoothParallaxY,
          }}
        >
            {/* SVG filter for floor ripple (displacement map) */}
            <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
              <defs>
                <filter id="floorRipple" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency={rippleFreq}
                    numOctaves="2"
                    seed="2"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale={rippleScale}
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>

            {/* Checkerboard Floor with liquid ripple */}
            <motion.div
              className="absolute bottom-0 w-full h-[70%]"
              style={{
                transform: "rotateX(80deg)",
                transformOrigin: "center bottom",
                backgroundImage: `repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)`,
                backgroundPosition: rippleEnabled ? floorBgPos : "50% 50%",
                backgroundSize: rippleEnabled ? floorBgSize : "100px 100px",
                boxShadow: "inset 0 -100px 150px rgba(0,0,0,0.9)",
                willChange: "filter, background-position, background-size, transform",
                filter: rippleEnabled ? "url(#floorRipple)" : "none",
              }}
            />

          {/* Left Wall with Eyes */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[220px] bg-gradient-to-r from-black via-gray-900 to-transparent"
            style={{
              transform: "rotateY(18deg)",
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              boxShadow: "inset -30px 0 60px rgba(0,0,0,0.9)",
            }}
          >
            {leftEyes.map((eye, i) => (
              <WallEye
                key={`left-${i}`}
                position="left"
                yPosition={eye.y}
                zPosition={eye.z}
              />
            ))}
          </div>

          {/* Right Wall with Eyes */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[220px] bg-gradient-to-l from-black via-gray-900 to-transparent"
            style={{
              transform: "rotateY(-18deg)",
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              boxShadow: "inset 30px 0 60px rgba(0,0,0,0.9)",
            }}
          >
            {rightEyes.map((eye, i) => (
              <WallEye
                key={`right-${i}`}
                position="right"
                yPosition={eye.y}
                zPosition={eye.z}
              />
            ))}
          </div>

          {/* Subtle ceiling plane to reinforce corridor */}
          <div
            className="absolute left-0 right-0 top-0 h-[22%]"
            style={{
              transform: "rotateX(-78deg)",
              transformOrigin: "center top",
              background: "linear-gradient(180deg, #000 0%, #0b0b0b 60%, transparent 100%)",
              boxShadow: "inset 0 80px 120px rgba(0,0,0,0.9)",
              opacity: 0.9,
            }}
          />

          {/* Female Silhouette at the end */}
          <motion.div
            className="absolute left-1/2 bottom-[15%]"
            style={{
              transform: `translate3d(-50%, 0, -2800px) scale(${1.2 + scroll * 0.015})`,
            }}
            animate={{
              opacity: [0.6, 0.75, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Female figure silhouette */}
            <div
              className="relative"
              style={{
                width: "60px",
                height: "180px",
                background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 15%, #000 40%)",
                clipPath: "polygon(40% 0, 60% 0, 55% 15%, 70% 25%, 72% 100%, 28% 100%, 30% 25%, 45% 15%)",
                filter: "blur(1px)",
                boxShadow: "0 0 30px rgba(255,255,255,0.2)",
              }}
            >
              {/* Head */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black"
                style={{
                  boxShadow: "0 0 15px rgba(255,255,255,0.15)",
                }}
              />
            </div>
          </motion.div>

          {/* Vanishing point light */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `translate3d(-50%, -50%, -3000px)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            <div
              className="w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent)",
                filter: "blur(30px)",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 text-center font-mono">
        <div className="inline-flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          <p className="text-white text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">Scroll to walk deeper • Move mouse to look around</p>
          <p className="text-white/70 text-[11px]">Hall of Observation</p>
        </div>
      </div>

      {/* Ripple toggle */}
      <div className="fixed bottom-8 right-6 z-20">
        <button
          aria-pressed={rippleEnabled}
          onClick={() => setRippleEnabled((v) => !v)}
          className="px-3 py-2 rounded-lg border border-white/20 bg-black/60 text-white text-xs hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          title="Toggle floor ripple"
        >
          Ripple: {rippleEnabled ? "On" : "Off"}
        </button>
      </div>
    </main>
  );
}

