import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react"; // Optional: install lucide-react or use emoji
import { FiX } from "react-icons/fi"; // For close icon in cart sidebar

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

const Navbar = ({ dark, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Example count

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = links.map((l) => document.querySelector(l.href));
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let section of sections) {
        if (
          section &&
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActiveLink(`#${section.id}`);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 top-0 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[#3e1f0dbb] shadow-xl shadow-yellow-900/30"
            : "bg-transparent"
        } text-white`}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-widest drop-shadow-lg"></h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative font-semibold group tracking-wide transition ${
                activeLink === link.href ? "text-yellow-400" : ""
              }`}
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-300 group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            animate={{
              rotate: [0, 5, -5, 5, 0],
              transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 px-3 py-2 bg-yellow-400 text-[#3e1f0d] font-bold rounded-lg shadow-lg hover:scale-105 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {cartCount}
            </span>
          </motion.button>

          <button
            onClick={toggleDarkMode}
            className="border border-white px-3 py-1 rounded hover:bg-white hover:text-[#3e1f0d] transition"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="absolute top-0 left-0 w-full h-screen bg-[#3e1f0d] flex flex-col items-center justify-center gap-8 text-2xl md:hidden z-40"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`hover:underline ${
                  activeLink === link.href ? "text-yellow-400" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                toggleDarkMode();
                setMenuOpen(false);
              }}
              className="border border-white px-6 py-2 rounded hover:bg-white hover:text-[#3e1f0d] transition"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔸 Cart Sidebar Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed top-0 right-0 h-screen w-[300px] bg-white text-black shadow-lg z-[60] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">🛒 Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-black hover:text-red-500"
              >
                <FiX size={24} />
              </button>
            </div>
            <p className="text-gray-700">2 items in your cart</p>
            <div className="mt-auto">
              <button className="w-full bg-yellow-400 text-[#3e1f0d] py-2 rounded-lg font-bold hover:bg-yellow-300 transition">
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
