import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Typewriter from "typewriter-effect";

const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasShownModal = localStorage.getItem("modalShown");
    if (!hasShownModal) {
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem("modalShown", "true");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center overflow-hidden custom-cursor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
         
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-[#c0a080] opacity-20 blur-3xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "30%", left: "50%", transform: "translate(-50%, -50%)" }}
          />

         
          <motion.div
            className="absolute top-10 text-5xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            ☕
          </motion.div>

          
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-20 animate-smoke" />

          
          <motion.div
            className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 w-[90%] max-w-md shadow-2xl text-white overflow-hidden"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <button
              className="absolute top-3 right-3 text-white hover:text-red-400 z-20"
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold text-center mb-6 font-serif tracking-wide z-10">
              <Typewriter
                options={{
                  strings: ["Welcome Back", "Brew Up Your Day!", "Login to the Roast!"],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                }}
              />
            </h2>

            <form className="space-y-4 z-10 relative">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 rounded-md bg-white/20 placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#c0a080]"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full p-3 rounded-md bg-white/20 placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#c0a080]"
              />
              <button
                type="submit"
                className="w-full bg-[#c0a080] text-[#3e2f26] font-bold py-2 rounded-md hover:bg-[#d4af90] transition duration-300"
                onClick={() => setShowModal(false)}
              >
                Log In
              </button>
            </form>

            <p className="text-sm mt-4 text-center text-white/70 z-10 relative">
              New here? <span className="underline cursor-pointer">Create an account</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
