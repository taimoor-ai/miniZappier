import { ArrowRight, Zap } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import LottieAnimation from "./LottieAnimation"
// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative lg:pl-10 w-full bg-white pt-28 md:pt-32 lg:pt-20 pb-16 md:pb-24 lg:pb-32 overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-40 animate-float-reverse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* FLEX CONTAINER */}
        <div className="flex flex-col lg:flex-row items-center justify-between  min-h-[80vh]">

          {/* LEFT SIDE */}
          <div className="w-ful lg:w-1/2">
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Automate Your{" "}
              <span className="text-gray-600">Entire Workflow</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Connect your favorite apps, create powerful automations, and save
              hours of manual work every week. No coding required.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 hover:scale-105">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold border-2 border-black hover:bg-black hover:text-white transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid text-black grid-cols-3 gap-6 max-w-md">
              <div>
                <div className="text-2xl  font-bold">1000+</div>
                <div className="text-sm text-gray-500">Apps Integrated</div>
              </div>
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="w-full h-full  lg:w-1/2 flex  items-center">
            <div className="w-full h-full max-w-lg">
              <LottieAnimation />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}