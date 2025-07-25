import { motion } from "framer-motion";
import React from "react";

function VideoSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center custom-cursor">
      {/* 🔁 Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video.mp4"
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🎨 Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

      {/* 🌟 Animated Content */}
      <motion.div
        className="relative z-20 text-white text-center px-4 max-w-screen-md"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* ✨ Glowing Pulse Heading */}
        <motion.h2
          className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold mb-4 drop-shadow-lg"
          style={{
            animation: "glowPulse 3s ease-in-out infinite",
            color: "#fff",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        >
          EXPERIENCE THE POUR
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-[clamp(1rem,2.5vw,1.5rem)] font-semibold tracking-wide drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Freshly brewed, iced to perfection
        </motion.p>
      </motion.div>

      {/* ✨ Keyframes for glow */}
      <style>
        {`
          @keyframes glowPulse {
            0%, 100% {
              text-shadow: 0 0 0px rgba(255, 255, 255, 0.2);
            }
            50% {
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
            }
          }
        `}
      </style>
    </section>
  );
}

export default VideoSection;
