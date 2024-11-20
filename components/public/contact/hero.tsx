"use client";

import { motion } from "framer-motion";

export const ContactHero = () => {
  return (
    <section className="relative h-[40vh] min-h-[300px] bg-gradient-to-r from-green-600 to-green-400 dark:from-green-900 dark:to-green-700">
      <div className="absolute inset-0 bg-grid-white/15" />
      <div className="relative container h-full flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center"
        >
          Contact Us
        </motion.h1>
      </div>
    </section>
  );
};
