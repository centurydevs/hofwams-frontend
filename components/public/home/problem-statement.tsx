"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const ProblemStatement = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-20 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1505935428862-770b6f24f629"
              alt="Food waste"
              width={500}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="font-fraunces text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              The food waste challenge
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Food waste is a critical issue in the hospitality industry,
              leading to economic losses and environmental impact. Our solution
              helps businesses reduce waste, improve efficiency, and contribute
              to sustainability.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
