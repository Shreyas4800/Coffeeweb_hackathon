import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    name: "Classic Latte",
    img: "dragon_1.jpg",
    price: "₹199",
    type: "Hot Coffee",
    details: "Rich and smooth classic latte.",
    bg: "from-[#4e342e] to-[#3e2723]",
  },
  {
    name: "Cappuccino",
    img: "dragon_2.jpg",
    price: "₹179",
    type: "Hot Coffee",
    details: "Frothy delight with a shot of espresso.",
    bg: "from-[#5d4037] to-[#4e342e]",
  },
  {
    name: "Espresso",
    img: "dragon_3.jpg",
    price: "₹149",
    type: "Hot Coffee",
    details: "Strong and bold espresso shot.",
    bg: "from-[#6d4c41] to-[#5d4037]",
  },
  {
    name: "Mocha",
    img: "dragon_4.jpg",
    price: "₹229",
    type: "Hot Coffee",
    details: "Chocolate infused rich mocha.",
    bg: "from-[#795548] to-[#6d4c41]",
  },
  {
    name: "Iced Latte",
    img: "dragon_5.jpg",
    price: "₹249",
    type: "Cold Coffee",
    details: "Chilled latte with smooth flavors.",
    bg: "from-[#8d6e63] to-[#795548]",
  },
  {
    name: "Hazelnut Latte",
    img: "dragon_6.jpg",
    price: "₹259",
    type: "Hot Coffee",
    details: "Nutty and creamy hazelnut latte.",
    bg: "from-[#a1887f] to-[#8d6e63]",
  },
  {
    name: "Caramel Macchiato",
    img: "dragon_7.jpg",
    price: "₹269",
    type: "Hot Coffee",
    details: "Sweet caramel notes with creamy espresso.",
    bg: "from-[#bcaaa4] to-[#a1887f]",
  },
];

export default function CoffeeProductSlider() {
  const [current, setCurrent] = useState(0);
  const [cart, setCart] = useState({}); 

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const slideLeft = () => {
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
  };

  const slideRight = () => {
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const addToCart = (index) => {
    setCart((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div
      className={`w-full min-h-screen bg-gradient-to-br ${products[current].bg} transition-all duration-700 ease-in-out flex flex-col justify-center items-center py-20 px-4 custom-cursor`}
    >
      
      <div className="flex items-center justify-between w-full max-w-6xl mb-6 px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-left  font-Boska ">
          Our Products 
        </h2>
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white"
          >
            <ShoppingCart size={30} />
          </motion.div>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#ffcb74] text-[#3e2723] text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
              {cartCount}
            </span>
          )}
        </div>
      </div>

     
      <div className="relative w-full max-w-6xl flex justify-center items-center">
    
        <button
          onClick={slideLeft}
          className="absolute left-4 sm:left-8 z-10 bg-[#3e2723]/80 p-4 rounded-full hover:bg-[#4e342e] shadow-xl hover:scale-110 transition-all"
        >
          <ChevronLeft className="text-white w-7 h-7" />
        </button>

      
        <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.02} transitionSpeed={2500}>
          <div className="relative group bg-[#2e1a13]/70 backdrop-blur-lg rounded-3xl text-white w-[95%] max-w-[500px] p-6 sm:p-8 shadow-2xl transform transition-all duration-700 hover:scale-105 ring-2 ring-[#ffcb74]/30 hover:ring-4 hover:ring-[#ffcb74]/70">
            <div className="relative overflow-hidden rounded-xl mb-6">
              <img
                src={`/images/${products[current].img}`}
                alt={products[current].name}
                className="w-full h-80 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all duration-500">
                <button
                  onClick={() => addToCart(current)}
                  className="bg-[#ffcb74] text-[#3e2723] font-bold px-5 py-2 rounded-lg shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-center mb-3vv">
              {products[current].name}
            </h3>
            <p className="text-2xl text-[#ffcb74] text-center font-semibold mb-2">
              {products[current].price}
            </p>
            <p className="text-sm text-center italic mb-1">{products[current].type}</p>
            <p className="text-xs text-center opacity-80">{products[current].details}</p>

            {cart[current] && (
              <p className="text-center text-sm mt-3 text-[#ffcb74]">
                In Cart: <strong>{cart[current]}</strong>
              </p>
            )}
          </div>
        </Tilt>

        
        <button
          onClick={slideRight}
          className="absolute right-4 sm:right-8 z-10 bg-[#3e2723]/80 p-4 rounded-full hover:bg-[#4e342e] shadow-xl hover:scale-110 transition-all"
        >
          <ChevronRight className="text-white w-7 h-7" />
        </button>
      </div>

     
      <div className="flex mt-8 gap-3">
        {products.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-[#ffcb74]" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
