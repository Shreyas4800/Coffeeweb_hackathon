import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreenWrapper({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval;

    progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 30); // Progress to 100 in ~3s

    // Delay hiding splash until progress + fade-out is complete
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setShowSplash(false);
    }, 4000); // 3s + 1s fade-out buffer

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden bg-[#3e1f0d]"> {/* Added bg color to prevent white flash */}
      <AnimatePresence mode="wait"> {/* Smooth transition without white gap */}
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="w-full h-screen flex flex-col justify-center items-center bg-[#3e1f0d] relative"
          >
            <DotLottieReact
              src="https://lottie.host/01fc562a-77ec-4c36-b606-e39acf489281/do9ZUBcmTk.lottie"
              loop
              autoplay
            />

            {/* Loading Bar */}
            <div className="absolute bottom-12 w-3/4 max-w-[500px]">
              <div className="w-full h-4 bg-[#a9765a] rounded-full overflow-hidden border-2 border-[#fff]/20">
                <div
                  className="h-full bg-[#ffcb74] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-white mt-2 font-semibold">
                {progress}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
