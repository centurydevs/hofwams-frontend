"use client";

import { motion } from "framer-motion";

import Image from "next/image";

import { containerVariants, itemVariants } from "@/utils";

export const Welcome = () => {
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
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-500">
              WELCOME TO HOFWAMS
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              A web application designed to tackle the growing issue of{" "}
              <span className="text-red-600 font-semibold">food waste</span> in
              the hospitality industry. Our goal is to help restaurants, event
              organizers, and catering services manage their food resources more
              efficiently, reducing waste while maintaining high standards of
              service.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              This platform provides{" "}
              <span className="text-green-600 font-semibold">data-driven</span>{" "}
              tools that enable users to predict guest attendance, manage
              inventory, and optimize kitchen operations. By using{" "}
              <span className="text-purple-600 font-semibold">
                advanced analytics and technology
              </span>
              , we aim to support businesses in achieving greater sustainability
              and efficiency in their food supply processes.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="relative">
            <Image
              src="/assets/food-waste.png"
              alt="Food waste prevention illustration"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
