import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import success from "../assets/workflow.json";

const HoverAnimation = () => {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: success,
    });

    return () => animRef.current.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f6f7",
      }}
    />
  );
};

export default HoverAnimation;