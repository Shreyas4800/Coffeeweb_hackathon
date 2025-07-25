import React from "react";
import { motion } from "framer-motion";
import { Coffee, Leaf, Smile } from "lucide-react";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8 },
  }),
};

const About = () => {
  return (
    <section
      id="about"
      className="relative z-10 px-6 py-20 md:px-20 bg-gradient-to-b from-[#1f0e0e] to-[#000000] text-white overflow-hidden"
    >
      {/* Floating Background Animation */}
      <div className="absolute inset-0  bg-cover opacity-[0.03] pointer-events-none z-0" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <motion.h2
          variants={textVariants}
          className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4"
        >
          About <span className="text-white underline underline-offset-8 decoration-pink-500 font-Boska">Sleepy Owl</span>
        </motion.h2>

        <motion.p
          variants={textVariants}
          className="text-lg text-gray-300 leading-relaxed mt-6"
        >
          At <span className="text-yellow-500 font-semibold">Sleepy Owl</span>, we craft the perfect iced coffee
          experience using handpicked beans, rich flavors, and modern techniques.
          Whether it’s a chill afternoon or a productive morning, our coffee
          brings a cool twist to your daily grind.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 max-w-6xl mx-auto relative z-10">
        {[ // Cards data
          {
            icon: <Coffee size={40} className="mx-auto text-yellow-400 mb-4" />,
            title: "Finest Coffee Beans",
            desc: "We source ethically grown beans to deliver bold flavor and freshness in every sip.",
          },
          {
            icon: <Leaf size={40} className="mx-auto text-green-400 mb-4" />,
            title: "Eco-Friendly Brewing",
            desc: "Sustainability at our core—eco cups, green roasting, zero waste.",
          },
          {
            icon: <Smile size={40} className="mx-auto text-pink-400 mb-4" />,
            title: "Brewed With Love",
            desc: "Every cup is made to perfection with passion, care, and a little joy.",
          },
        ].map((card, i) => (
          <motion.div
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={cardVariants}
            key={i}
            className="bg-[#2c1c1c]/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl border border-[#3b2c2c] hover:shadow-yellow-500/10 transition-all duration-300 hover:scale-105"
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-gray-400 text-sm">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-16 z-10 relative">
        <motion.a
          href="#products"
          whileHover={{ scale: 1.1 }}
          className="inline-block px-8 py-3 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-all shadow-lg"
        >
          Explore Our Beans ☕
        </motion.a>
      </div>
    </section>
  );
};

export default About;
