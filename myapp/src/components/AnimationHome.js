import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Import your images
import trainAni from "../img/trainAni.jpg";
import trainAni1 from "../img/trainAni1.jpg";
import trainAni2 from "../img/trainAni2.jpg";
import trainAni3 from "../img/trainAni3.jpg";
import trainAni4 from "../img/trainAni4.jpg";
import trainAni5 from "../img/trainAni5.jpg";
import trainAni6 from "../img/trainAni6.jpg";
import trainAni7 from "../img/trainAni7.jpg";
import trainAni8 from "../img/trainAni8.jpg";
import trainAni9 from "../img/trainAni9.jpeg";

export default function Animate() {
  const containerRef = useRef();
  const tl = useRef();

  const images = [
    trainAni9,
    trainAni2,
    trainAni3,
    trainAni4,
    trainAni5,
    trainAni6,
    trainAni7,
    trainAni8,
    trainAni1,
    trainAni,
  ];

  useEffect(() => {
    const panelCount = images.length;
    const movePercent = 100 / panelCount;

    tl.current = gsap.timeline({ repeat: -1, paused: false });

    images.forEach((_, i) => {
      tl.current.to(containerRef.current, {
        xPercent: -movePercent * i,
        duration: 1.5,
        ease: "power2.inOut",
      });
      tl.current.to({}, { duration: 0.6 }); // pause between slides
    });

    tl.current.to(containerRef.current, {
      xPercent: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    const el = containerRef.current;
    el.addEventListener("mouseenter", () => tl.current.pause());
    el.addEventListener("mouseleave", () => tl.current.resume());

    return () => {
      el.removeEventListener("mouseenter", () => tl.current.pause());
      el.removeEventListener("mouseleave", () => tl.current.resume());
      tl.current.kill();
    };
  }, [images]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        padding: "30px 0",
        background: "#f7f7f7",
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          gap: "10px", // tighter space
          paddingLeft: "30px", // ✅ left space for first image
          width: `${images.length * 280}px`, // updated width for scroll
          alignItems: "center",
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            style={{
              width: "270px", // ✅ increased size
              height: "180px",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
              background: "#fff",
              transition: "transform 0.4s ease",
              flexShrink: 0,
            }}
          >
            <img
              src={src}
              alt={`slide-${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease, filter 0.3s ease",
                filter: "brightness(0.95)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06)";
                e.currentTarget.style.filter = "brightness(1)";
                const shine = e.currentTarget.nextElementSibling;
                shine.style.opacity = 1;
                shine.style.transform = "translateX(100%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(0.95)";
                const shine = e.currentTarget.nextElementSibling;
                shine.style.opacity = 0;
                shine.style.transform = "translateX(-100%)";
              }}
            />
            {/* Shine effect */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "-70%",
                width: "50%",
                height: "100%",
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
                opacity: 0,
                pointerEvents: "none",
                transition: "all 0.6s ease",
                transform: "translateX(-100%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
