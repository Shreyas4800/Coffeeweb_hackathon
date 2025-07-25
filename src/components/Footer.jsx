import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import Insta from "./Insta";



export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show scroll-to-top button
  useEffect(() => {
    const toggleVisibility = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative bg-gradient-to-br from-[#3e2723] to-[#1b0f0a] text-white pt-16 pb-10 px-6 sm:px-12 md:px-20 lg:px-32 z-10 custom-cursor"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between">
        {/* Brand */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold font-Boska text-[#ffcb74] mb-4">Sleepy Owl </h1>
          <p className="text-sm leading-relaxed opacity-90">
            Handcrafted coffee with soul. Discover the real taste of freshly
            brewed magic.
          </p>
          <div className="flex gap-10 mt-6">
           
            <Insta />
         
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-6 text-[#ffcb74]">Contact</h2>
          <ul className="space-y-4 text-sm opacity-90">
            <li className="flex items-center gap-3">
              <MapPin size={18} /> 123 Coffee Street, Bean Town, Earth 90210
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} /> hello@sleepyowl.com
            </li>
          </ul>
        </div>

        {/* Map + Newsletter */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-[#ffcb74]">Find Us</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#ffcb74]/20 hover:scale-105 transition-all duration-500 mb-6">
            <img
              src="https://imgs.search.brave.com/s4bciuxd_id2V10wfCcFmDUtv3DxEd8Ab1w58Z8Zt08/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvY3VzdG9tLWxv/Y2F0aW9uLW1hcC1p/bnRlcmZhY2Utd2Vi/LW1vYmlsZS1hcHBf/MTUwMTAxLTgzNDQu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA"
              alt="Google Map"
              className="w-full h-40 object-cover"
            />
          </div>

          <h2 className="text-lg font-medium mb-2">Subscribe to our newsletter</h2>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-[#2d1b16] text-white border border-[#ffcb74]/30 placeholder:text-[#ffcb74]/60 focus:outline-none focus:ring-2 focus:ring-[#ffcb74]"
            />
            <button
              type="submit"
              className="bg-[#ffcb74] hover:bg-[#ffb347] text-[#3e2723] font-bold px-4 py-2 rounded-lg transition-all"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-12 pt-6 border-t border-white/10 text-xs opacity-60">
        © 2025 Sleepy Owl Coffee. All rights reserved.
      </div>

      
    </motion.footer>
  );
}
