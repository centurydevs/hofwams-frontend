"use client";

import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="min-h-screen relative">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        alt="Food background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay - asymmetric from left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/80 to-transparent dark:from-green-950/95 dark:via-green-900/80" />

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="max-w-3xl text-white"
        >
          <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Optimize Your Food Supply, Reduce Waste And Save Cost
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            with advanced forecasting and inventory solutions
          </p>
          <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-lg px-8 py-6">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
