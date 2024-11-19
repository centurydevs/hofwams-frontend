"use client";

import { motion } from "framer-motion";
import { Target } from "lucide-react";
import Image from "next/image";

import { containerVariants, itemVariants } from "@/utils";

export const Vision = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-full aspect-square">
              <Image
                src="/assets/target.webp"
                alt="Target with arrows representing our vision"
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent rounded-2xl" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-full shadow-xl">
              <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-500">
              OUR VISION
            </h2>
            <div className="bg-green-100/50 dark:bg-green-900/50 p-6 rounded-xl backdrop-blur-sm">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                To become a leading force in transforming the hospitality
                industry&apos;s approach to food waste management through
                cutting-edge, data-driven solutions. Our vision is to empower
                businesses with advanced tools and technologies that promote
                sustainability, enhance operational efficiency, and reduce
                environmental impact. By providing actionable insights and
                fostering responsible consumption, we aim to create a future
                where food waste is significantly minimized, resources are
                optimized, and businesses contribute meaningfully to global
                sustainability goals. Our goal is to not only address current
                food waste challenges but to pave the way for a more sustainable
                and efficient food service industry worldwide.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
