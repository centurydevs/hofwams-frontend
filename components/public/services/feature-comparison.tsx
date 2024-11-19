"use client";

import { motion } from "framer-motion";

import { containerVariants, itemVariants } from "@/utils";

export const FeatureComparison = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="text-center"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500 mb-12"
      >
        What distinguishes both packages?
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <motion.div
          variants={itemVariants}
          className="bg-green-100 dark:bg-green-900/50 p-8 rounded-full aspect-square flex items-center justify-center text-center"
        >
          <div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">
              Individual Mode
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Self-managed event planning, limited access to services, hire
              freelancers for event logistics, limited inventory features.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-green-100 dark:bg-green-900/50 p-8 rounded-full aspect-square flex items-center justify-center text-center"
        >
          <div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">
              Organization Mode
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Full control over event management for organisers using their
              infrastructure, comprehensive inventory tracking, guest and meal
              planning, invoicing, and detailed analytics.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
      >
        By offering distinct features tailored for organisers and hospitality
        businesses, Hofwams ensures a flexible solution that can adapt to both
        small-scale personal events and large professional events run by
        experienced hospitality providers.
      </motion.p>
    </motion.section>
  );
};
