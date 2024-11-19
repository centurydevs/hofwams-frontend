"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import Image from "next/image";

import { containerVariants, itemVariants } from "@/utils";

export const Sustainability = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            variants={itemVariants}
            className="order-2 lg:order-1 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-500">
              Sustainability Statement
            </h2>
            <div className="bg-gray-100/50 dark:bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We are dedicated to fostering sustainability in the hospitality
                industry by reducing food waste through innovative and
                data-driven solutions. Our approach emphasizes responsible
                resource management, minimizing environmental impact while
                maintaining the quality and efficiency of operations. By
                integrating sustainable practices into everyday business
                processes, we aim to support a circular economy, promote
                environmental stewardship, and contribute to global efforts in
                reducing food waste. Our commitment to sustainability extends
                beyond waste reduction; we strive to create long-term value for
                businesses, communities, and the planet through thoughtful
                innovation and continuous improvement.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full aspect-square">
              <Image
                src="/assets/sustainability.webp"
                alt="Sustainable city illustration"
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-green-600/20 to-transparent rounded-2xl" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-full shadow-xl">
              <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
