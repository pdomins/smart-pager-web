import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function ClientLanding() {
  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const scrollToElement = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const yOffset = ref.current.offsetTop;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Add an event listener to handle scrolling to the aboutUsRef element
    const handleScrollToAboutUs = () => {
      scrollToElement(aboutUsRef);
    };

    // Attach the event listener to a button or any other trigger
    const scrollButton = document.getElementById("scrollButton");
    if (scrollButton) {
      scrollButton.addEventListener("click", handleScrollToAboutUs);
    }

    return () => {
      // Remove the event listener when the component unmounts
      if (scrollButton) {
        scrollButton.removeEventListener("click", handleScrollToAboutUs);
      }
    };
  }, [aboutUsRef]);

  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <div className="absolute bottom-20 p-4 text-custom-blue">
          <p className="text-7xl mb-2">
            <b>
              Te traemos <br className="block md:inline" />
              una solución
              <br className="block md:inline" /> a las filas eternas
            </b>
          </p>
          <p className="text-4xl">
            Hace{' '}
            <span className="border-b-4 border-amber-400 mb-4">
              <button id="scrollButton">click aquí</button>
            </span>{' '}
            para saber más
          </p>
        </div>
      </div>
      <main className="flex-grow overflow-y-auto mt-16">
        <div className="min-h-screen">
          <motion.div ref={aboutUsRef} initial={{ y: 0 }} animate={controls}>
            <p id="about-us">This is some content below the text.</p>
            <p>It will scroll along with the rest of the page.</p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
