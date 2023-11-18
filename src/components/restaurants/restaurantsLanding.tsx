import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import AboutUs from "./about-us";

export default function RestaurantsLanding() {
  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const scrollToElement = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const yOffset = ref.current.offsetTop;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScrollToAboutUs = () => {
      scrollToElement(aboutUsRef);
    };

    const scrollButton = document.getElementById("scrollButton");
    if (scrollButton) {
      scrollButton.addEventListener("click", handleScrollToAboutUs);
    }

    return () => {
      if (scrollButton) {
        scrollButton.removeEventListener("click", handleScrollToAboutUs);
      }
    };
  }, [aboutUsRef]);

  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <div className="absolute bottom-20 p-4 text-custom-blue">
          <p className="text-7xl mb-4">
            <b>
              Le traemos una
              <br className="block md:inline" />
              solución a tu comercio
              <br className="block md:inline" />
              gastronómico para <br className="block md:inline" />
              las filas eternas
            </b>
          </p>
          <p className="text-4xl">
            Hace{" "}
            <span className="border-b-4 border-amber-400 mb-4">
              <button id="scrollButton">click aquí</button>
            </span>{" "}
            para saber mas
          </p>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="min-h-screen">
          <motion.div ref={aboutUsRef} initial={{ y: 0 }} animate={controls}>
            <AboutUs />
          </motion.div>
        </div>
      </div>
    </>
  );
}
