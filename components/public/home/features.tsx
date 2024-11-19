"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/utils";

export function Features() {
  return (
    <motion.section
      className="grid lg:grid-cols-2 gap-12 items-center container mx-auto px-4 mt-12"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-green-800 dark:text-green-100">
          Introducing ..... HOFWAMS
        </h2>
        <p className="text-lg text-green-700 dark:text-green-200">
          Our web application uses data-driven techniques to forecast guest
          attendance, optimize meal portions, and manage inventory effectively.
        </p>
        <p className="text-lg text-green-700 dark:text-green-200">
          By leveraging technology, we help businesses cut down on food waste
          while maintaining high-quality service.
        </p>
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Learn More
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-green-200 dark:bg-green-800 rounded-full opacity-50 blur-3xl" />
        <div className="relative z-10">
          <motion.div
            className=""
            variants={{
              animate: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <Image
              src="/assets/idea.png"
              width={400}
              height={400}
              alt="Idea"
              className=""
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
