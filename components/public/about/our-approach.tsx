"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { containerVariants, itemVariants } from "@/utils";

export const OurApproach = () => {
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
          <motion.div variants={itemVariants} className="space-y-6 order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-500">
              OUR APPROACH
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our approach is rooted in{" "}
              <span className="text-pink-600 font-semibold">
                research and practical insights
              </span>
              , developed through collaboration with industry professionals. We
              believe that minimizing food waste not only benefits individual
              businesses financially but also contributes to global
              environmental efforts.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Explore our platform and join us in the movement towards reducing
              food waste and building a more sustainable future.
            </p>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Get Started
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="order-2">
            <Image
              src="/assets/approach.jpeg"
              alt="Our approach illustration"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
