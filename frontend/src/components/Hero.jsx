import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import LottieAnimation from "./LottieAnimation";

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

// ─── Stats (scroll-triggered separately) ─────────────────────────────────────

const stats = [
  { value: "1000+", label: "Apps Integrated" },
  { value: "50K+",  label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
];

function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid mt-6 text-black grid-cols-3 gap-6 max-w-md">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          custom={i}
          variants={statVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-100px" });

  return (
    <section className="relative lg:pl-10 w-full bg-white pt-28 md:pt-32 lg:pt-20 pb-16 md:pb-24 lg:pb-32 overflow-hidden">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-40 animate-float-reverse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* FLEX CONTAINER */}
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">

          {/* LEFT SIDE — staggered on load */}
          <motion.div
            className="w-full lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Heading */}
            <motion.h1
              variants={fadeSlideUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-nunito text-black mb-6 leading-tight"
            >
              Automate Your{" "}
              <span className="text-gray-600">Entire Workflow</span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={fadeSlideUp}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg"
            >
              Connect your favorite apps, create powerful automations, and save
              hours of manual work every week. No coding required.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeSlideUp}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 hover:scale-105">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold border-2 border-black hover:bg-black hover:text-white transition-all duration-300">
                Watch Demo
              </button>
            </motion.div>

            {/* Stats — scroll-triggered */}
            <Stats />
          </motion.div>

          {/* RIGHT SIDE — scroll-triggered slide in from right */}
          <motion.div
            ref={rightRef}
            className="w-full h-full lg:w-1/2 flex items-center"
            variants={fadeSlideRight}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
          >
            <div className="w-full h-full max-w-lg">
              <LottieAnimation />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}