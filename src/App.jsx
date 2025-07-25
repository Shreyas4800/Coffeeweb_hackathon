import React, { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import Relodd from "./components/Relodd";
import Video from "./components/Video";
import Slides from "./components/Slides";
import Products from "./components/Products";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sd from "./components/Sd";
import About from "./components/About";
import Footer from "./components/Footer";
import { motion } from "framer-motion";



function FloatingBeans() {
  const beansRef = useRef([]);

  useEffect(() => {
    gsap.to(beansRef.current, {
      y: "+=30",
      x: "+=30",
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
      {[...Array(20)].map((_, i) => (
        <img
          key={i}
          ref={(el) => (beansRef.current[i] = el)}
          src="/bean.png"
          alt="bean"
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: `${Math.random() * 360}deg`,
            width: "30px",
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedCoffee() {
  const modelRef = useRef();
  const glb = useGLTF("/creamed_coffee.glb");
  const [hovered, setHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    if (glb.scene) {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.scale.set(32, 32, 32);
        }
      });
    }

    if (modelRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(modelRef.current.position, { x: -20, y: 0, z: 0 }, { x: 0, duration: 2 })
        .fromTo(modelRef.current.scale, { x: 3, y: 3, z: 3 }, { x: 1, y: 1, z: 1, duration: 2, ease: "back.out(1.7)" }, "<")
        .fromTo(modelRef.current.rotation, { y: -Math.PI * 4 }, { y: 0, duration: 2 }, "<");
    }
  }, [glb.scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
      if (hovered) {
        modelRef.current.scale.set(1.2, 1.2, 1.2);
        modelRef.current.rotation.y += mouseX * 0.0005;
      } else {
        modelRef.current.scale.set(1, 1, 1);
      }
    }
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById("canvas-container").getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(x - centerX, y - centerY);
      if (distance < 200) {
        setHovered(true);
        setMouseX(x - centerX);
      } else {
        setHovered(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <primitive object={glb.scene} ref={modelRef} position={[0, -1.5, 1]} />;
}

function AnimatedModelCanvas() {
  return (
    <div id="canvas-container" className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={<Html><p className="text-white"> Coffee Boiling...</p></Html>}>
          <AnimatedCoffee />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function App() {
  const bgRef = useRef();
  const [dark, setDark] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(bgRef.current, {
        rotateX: y,
        rotateY: x,
        scale: 1.05,
        transformOrigin: "center",
        ease: "power3.out",
        duration: 0.9,
      });
      gsap.to(bgRef.current, {
        x: x * 1.5,
        y: y * 1.5,
        scale: 1.1,
        duration: 0.9,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  

    const toggleDarkMode = () => setDark((prev) => !prev);
    

    

  return (
    <Relodd>
      <Login />
      <div id="home">
      <div className={`relative min-h-screen font-sans ${dark ? "bg-black text-white" : "bg-gradient-to-br from-[#d7b59d] via-[#e7cba9] to-[#d7b59d] text-white"} scroll-smooth snap-y snap-mandatory mr-0 `}>
        <img
          ref={bgRef}
          src="/backgrnd.jpg"
          alt="background"
          className="absolute inset-0 w-screen min-h-screen object-cover opacity-10 z-0 overflow-hidden"
          style={{ willChange: "transform" }}
        />
        <img
  ref={bgRef}
  src="/logooo.png"
  alt="logo"
  className="absolute top-10 left-5 w-[40vw] max-w-[300px] h-auto object-contain z-0 "
  style={{ willChange: "transform" }}
/>

       <Navbar dark={dark} toggleDarkMode={toggleDarkMode} />


        <section className="relative flex items-center justify-center min-h-[100vh] text-center overflow-hidden snap-start">
          <FloatingBeans />
          <div className="absolute inset-0 z-10">
            <AnimatedModelCanvas />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#3e1f0d]/80 via-transparent to-transparent z-20"></div>
          <div className="relative z-30 flex flex-col items-center justify-center px-6">
           <motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      },
    },
  }}
  className="flex gap-1 md:gap-3 flex-wrap justify-center mt-40 font-Boska"
>
  {"SLEEPY   OWL".split("").map((char, i) => (
    <motion.span
      key={i}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{
        scale: 1.2,
        color: "#ffcb74",
        textShadow: "0px 0px 15px #ffcb74",
      }}
      className="text-5xl md:text-8xl font-extrabold drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-[#ffcb74] via-white to-[#ffcb74] cursor-default transition-all mt-80 mb-"
    >
      {char}
    </motion.span>
  ))}
</motion.div>


            <motion.h2
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut", delay: 1 }}
  whileHover={{
    textShadow: "0 0 15px #ffffffaa",
    color: "#fff8e1",
    scale: 1.04,
    transition: { duration: 0.3 },
  }}
  className="relative inline-block text-3xl md:text-6xl font-bold drop-shadow-md text-white  mt-0"
>

</motion.h2>

            <motion.p
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.3, ease: "easeOut", delay: 1.8 }}
  whileHover={{
    textShadow: "0 0 10px #ffcb74, 0 0 20px #ffcb74",
    scale: 1.05,
    transition: { duration: 0.4 },
  }}
  className="text-lg md:text-2xl uppercase tracking-widest text-[#ffcb74] font-semibold my-6 animate-glowText"
>
  Experience The Chill
</motion.p>

        
          </div>
          <div className="absolute bottom-4 left-15 transform -translate-x-1/2 opacity-50 "><Sd /></div>

        </section>
        </div>

          <Video /> 
          <div id="products">
          <Products />
          </div>
          <About />
          <Slides />
         
          
       
        <div id="contact">
        <Footer />
        </div>
      </div>
    </Relodd>
  );
}

useGLTF.preload("/creamed_coffee.glb");
