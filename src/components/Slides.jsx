import React, { useEffect, useRef } from "react";
import "./Slide.css";
import gsap from "gsap";

export default function BannerSlider() {
  const owlRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 20;
      const y = (e.clientY - innerHeight / 2) / 20;

      gsap.to(owlRef.current, {
        x,
        y,
        rotateX: y * 0.5,
        rotateY: -x * 0.5,
        ease: "power3.out",
        duration: 0.7
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="p-10 md:p-20 bg-gradient-to-br from-[#7b4a2b] via-[#a9765a] to-[#7b4a2b] min-h-screen text-black custom-cursor">
      <div className="banner">
        <div className="slider" style={{ "--quantity": 10 }}>
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="item"
              style={{ "--position": index + 1 }}
            >
              <img src={`/images/dragon_${index + 1}.jpg`} alt={`dragon_${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="content">
          <div className="model flex flex-col items-center justify-center text-center font-Boska">
            <h2 className="text-8xl font-bold mb-6">Varieties of our products</h2>
            <h3 className="text-2xl font-bold mb-6">Scroll down to see more details</h3>
            <img
              ref={owlRef}
              className="h-60 w-60 object-contain"
              src="/owl.png"
              alt="owl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
